import { api } from '@/services/api/api';
import { AccountCreateRequest } from '@/services/api/models';

export default async function newUser(body: AccountCreateRequest) {
  try {
    const { error, data } = await api.POST('/accounts', {
      body,
    });

    if (error) {
      if (typeof error === 'string') {
        throw new Error(error);
      }
      throw new Error(
        (error as any)?.message ?? (error as any)?.error ?? 'UNKNOWN_ERROR'
      );
    }

    if (!data || !data.token) {
      throw new Error("Couldn't create user");
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}
