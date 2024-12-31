"use server";

import { createSupabaseClient } from "@/supabase/server";

export async function getDaftarKelas() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from("Kelas").select(
    `
      id, 
      nama_kelas, 
      Sekolah(id, nama_sekolah)
    `
  );
  if (error) {
    throw error;
  }
  console.log(data);
  return data;
}

export type DaftarKelasType = Awaited<ReturnType<typeof getDaftarKelas>>;
