"use server";

import { redirect } from "next/navigation";

import { createSupabaseClient } from "@/supabase/server";
import { loginSchema } from "./auth-schema";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
  const supabase = await createSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error?.message) {
    return {
      message: "Gagal login",
      description: error.message,
      status: "error",
    };
  }

  return {
    message: "Berhasil login",
    description: "Berhasil login",
    status: "success",
  };
}

export async function signup(formData: FormData) {
  const supabase = await createSupabaseClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  redirect("/");
}
