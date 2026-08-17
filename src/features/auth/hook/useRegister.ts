'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api';
import { loginUser, registerUser } from '../auth.api';
import { registerSchema, type RegisterValues } from '../auth.schema';

export function useRegister() {
  const router = useRouter();
const form = useForm<RegisterValues>({
  resolver: zodResolver(registerSchema),
  mode: 'onBlur', 
});

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await registerUser(values);
      // Register sets no cookies — log in right after to start the session
      await loginUser({ email: values.email, password: values.password });
      toast.success('Account created');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Something went wrong');
    }
  });

  return { form, onSubmit };
}
