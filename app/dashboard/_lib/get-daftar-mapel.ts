"use server";

import { createSupabaseClient } from "@/supabase/server";

export async function getDaftarMapel() {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("MataPelajaran")
    .select("id, mata_pelajaran, tingkat_kelas, created_at");

  if (error) {
    throw error;
  }

  return data || [];
}
