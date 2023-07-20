// components/AuthGuard.js
import { getSession } from 'next-auth/react';

export async function AuthGuard() {
  const session = await getSession();
  if (!session) {
    return {
      destination: '/login',
      permanent: false,
    };
  }

  return null;
}