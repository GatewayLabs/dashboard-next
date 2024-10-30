'use client';
import { useCallback, useState } from 'react';

import { useSnackbar } from 'notistack';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  label: string;
  error?: Error;
};

export default function useCompute() {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<State>({
    isLoading: false,
    isSuccess: false,
    label: 'Executing operation...',
  });

  const onCompute = useCallback(async () => {
    setState({
      isLoading: true,
      isSuccess: false,
      label: 'Executing operation...',
    });
    try {
      const response = await fetch('/projects/github/api/compute'); // Ajuste o endpoint conforme necessário
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            setState({
              isLoading: false,
              isSuccess: true,
              label: 'Operation executed successfully',
            });
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          setState((prev) => ({ ...prev, label: chunk }));
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setState({
        isLoading: false,
        isSuccess: false,
        label: 'Operation failed',
        error,
      });
    }
  }, []);

  return {
    ...state,
    onCompute,
  };
}
