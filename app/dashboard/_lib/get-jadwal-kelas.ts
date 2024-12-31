"use server";

import { createSupabaseClient } from "@/supabase/server";

export async function getJadwalKelas() {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("Jadwal")
    .select(
      `
      id, 
      Kelas(nama_kelas, Murid(id)), 
      waktu_mulai, 
      waktu_selesai, 
      MataPelajaran(mata_pelajaran), 
      AbsenMurid(id, murid_id, status_absen), 
      NilaiKeaktifan(id, murid_id, nilai),
      PenempatanGuru(Sekolah(nama_sekolah))
      `
    )
    .order("waktu_mulai", { ascending: false })
    .limit(3);
  if (error) {
    throw error;
  }
  return data;
}

export type JadwalKelasType = Awaited<ReturnType<typeof getJadwalKelas>>;
