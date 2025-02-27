'use client';

import useDisconnectWallets from '@/services/wallets/use-disconnect-wallets';
import { WalletConnectionStateHandlers } from '@/services/wallets/wallet-connection-provider';
import { Network } from '@/types/web3';
import { useWallet as useSolWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { useMutation } from '@tanstack/react-query';
import bs58 from 'bs58';
import { useSignMessage } from 'wagmi';

type OnSignedMessage = {
  message: string;
  signature: string;
  wallet_address: string;
  network: Network;
};

type Props = {
  onGetNonce: (wallet: string, network: Network) => Promise<string>;
  onSignedMessage: (data: OnSignedMessage) => void;
  statesHandler?: WalletConnectionStateHandlers;
};

const SING_CANCEL_ERRORS = [
  'UserRejectedRequestError',
  'WalletSignMessageError',
];

export default function useConnectWallet({
  onGetNonce,
  onSignedMessage,
  statesHandler,
}: Props) {
  const { signMessageAsync: signMessageEvm } = useSignMessage();
  const { signMessage: signMessageSolana } = useSolWallet();
  const { signPersonalMessage } = useSuiWallet();

  const onSigneMessageSolana = async (message: string) => {
    if (!signMessageSolana) {
      throw new Error("Solana isn't connected");
    }
    const signature = await signMessageSolana(
      new TextEncoder().encode(message)
    );
    return bs58.encode(signature as Uint8Array);
  };

  const onSignMessageSui = async (message: string) => {
    const { signature } = await signPersonalMessage({
      message: new TextEncoder().encode(message),
    });
    return signature;
  };

  const {
    onDisconnectWallets,
    onDisconnectEvm,
    onDisconnectSolana,
    onDisconnectSui,
  } = useDisconnectWallets();

  const {
    mutateAsync: getNonce,
    isPending: isLoadingNonce,
    reset: resetNonce,
  } = useMutation({
    mutationKey: ['get-nonce'],
    mutationFn: async ({
      wallet,
      network,
    }: {
      wallet: string;
      network: Network;
    }) => onGetNonce(wallet, network),
  });

  const {
    mutateAsync: getSignature,
    isPending: isLoadingSignature,
    reset: resetSignature,
  } = useMutation({
    mutationKey: ['get-signature'],
    mutationFn: async ({
      nonce,
      network,
    }: {
      nonce: string;
      network: Network;
    }) => {
      switch (network) {
        case Network.Evm:
          return signMessageEvm({ message: nonce });
        case Network.Sol:
          return onSigneMessageSolana(nonce);
        case Network.Sui:
          return onSignMessageSui(nonce);
        default:
          throw new Error('Invalid network');
      }
    },
  });

  const {
    mutateAsync: connectWallet,
    isPending: isLoadingWalletConnection,
    reset: resetWallet,
  } = useMutation({
    mutationKey: ['connect-wallet-signature'],
    mutationFn: async (data: OnSignedMessage) => onSignedMessage(data),
    onError: onDisconnectWallets,
  });

  const onConnect = async (wallet: string, network: Network) => {
    try {
      statesHandler?.onSigning?.();
      const nonce = await getNonce({
        wallet,
        network,
      });
      const signature = await getSignature({
        nonce,
        network,
      });
      statesHandler?.onLoading?.();
      await connectWallet({
        signature,
        wallet_address: wallet,
        message: nonce,
        network: network,
      });
    } catch (error: any) {
      if (SING_CANCEL_ERRORS.includes(error?.name)) {
        statesHandler?.onPending?.();
      } else {
        statesHandler?.onError?.((error as Error).message);
      }
      onDisconnectWallets();
    } finally {
      resetNonce();
      resetSignature();
      resetWallet();
    }
  };

  return {
    onConnect,
    isPending:
      isLoadingNonce || isLoadingSignature || isLoadingWalletConnection,
    onDisconnectWallets,
  };
}
