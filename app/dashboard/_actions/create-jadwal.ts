"use server";

import { createSupabaseClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const jadwalSchema = z.object({
  kelas_id: z.coerce.number(),
  mapel_id: z.coerce.number(),
  waktu_mulai: z.string(),
  waktu_selesai: z.string(),
});

type JadwalInput = z.infer<typeof jadwalSchema>;

export async function createJadwal(data: JadwalInput) {
  const validated = jadwalSchema.parse(data);
  const supabase = await createSupabaseClient();

  const { error } = await supabase.from("Jadwal").insert({
    kelas_id: validated.kelas_id,
    mapel_id: validated.mapel_id,
    waktu_mulai: validated.waktu_mulai,
    waktu_selesai: validated.waktu_selesai,
  });

  if (error) {
    throw new Error("Gagal membuat jadwal: " + error.message);
  }

  revalidatePath("/dashboard");
  return { success: true };
}
