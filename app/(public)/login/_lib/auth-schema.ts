import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Masukkan alamat email yang valid')
    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, 'Password wajib diisi'),
});
