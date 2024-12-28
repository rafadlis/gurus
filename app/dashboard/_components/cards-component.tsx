import { ClassCard } from "@/app/dashboard/_components/class-card";
import { getJadwalKelas } from "@/app/dashboard/_lib/get-jadwal-kelas";
import { createSupabaseClient } from "@/supabase/server";
export async function CardsComponent() {
  const supabase = await createSupabaseClient();
  const jadwalKelas = await getJadwalKelas();
  const { data: user } = await supabase.auth.getUser();
  return (
    <div>
      {user?.user?.id ? "Logged in" : "Logged out"}
      {jadwalKelas.map((jadwal) => (
        <ClassCard data={jadwal} key={jadwal.id} />
      ))}
    </div>
  );
}
