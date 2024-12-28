import { DashboardHeader } from "@/components/dashboard-header";
import { AbsenMuridTable } from "./_components/absen-murid-table";

export default async function AbsenMuridPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <article className="flex flex-col gap-3">
      <DashboardHeader />
      <section className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold">Absensi Murid</h1>
          <p className="text-sm text-muted-foreground">
            Daftar absensi murid untuk jadwal ini.
          </p>
        </div>
        <AbsenMuridTable params={params} />
      </section>
    </article>
  );
}
