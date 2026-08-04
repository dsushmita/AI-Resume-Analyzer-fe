'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api, ApiError } from '@/lib/api';

const registerSchema = z.object({
  name: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      // Register creates the account but sets no cookies — log in to start the session
      await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
      toast.success('Account created');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Something went wrong');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your company</CardTitle>
          <CardDescription>Start analyzing resumes with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" {...register('companyName')} />
              {errors.companyName && (
                <p className="text-sm text-destructive">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
