"use server";

import { createSupabaseClient } from "@/supabase/server";

export async function getAbsenMurid(jadwalId: string) {
  const supabase = await createSupabaseClient();

  const { data: absenMurid, error } = await supabase
    .from("AbsenMurid")
    .select(
      `
      id,
      status_absen,
      murid_id,
      created_at,
      Murid (
        id,
        nama,
        nomor_absen
      )
    `
    )
    .eq("jadwal_id", jadwalId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return absenMurid;
}
