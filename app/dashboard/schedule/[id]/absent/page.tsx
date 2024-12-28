import { AbsenMuridTable } from "./_components/absen-murid-table";

export default async function AbsenMuridPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <section>
      <h1 className="font-bold">Absensi Murid</h1>
      <p className="text-sm">Daftar absensi murid untuk jadwal ini.</p>
      <AbsenMuridTable params={params} />
    </section>
  );
}
