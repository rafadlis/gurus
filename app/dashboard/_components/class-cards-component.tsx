import { ClassCard } from "@/app/dashboard/_components/class-card";
import { getJadwalKelas } from "@/app/dashboard/_lib/get-jadwal-kelas";

export async function ClassCardsComponent() {
  const jadwalKelas = await getJadwalKelas();

  return (
    <div className="flex flex-row gap-3 flex-wrap">
      {jadwalKelas.map((jadwal) => (
        <ClassCard key={jadwal.id} data={jadwal} />
      ))}
    </div>
  );
}
