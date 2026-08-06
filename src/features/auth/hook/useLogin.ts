'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api';
import { loginUser } from '../auth.api';
import { loginSchema, type LoginValues } from '../auth.schema';

export function useLogin() {
  const router = useRouter();
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await loginUser(values);
      toast.success('Logged in');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Something went wrong');
    }
  });

  return { form, onSubmit };
}
