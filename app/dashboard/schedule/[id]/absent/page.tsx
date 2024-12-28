import { DashboardHeader } from "@/components/dashboard-header";
import { AbsenMuridTable } from "./_components/absen-murid-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AbsenMuridPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <article className="flex flex-col gap-3">
      <DashboardHeader />
      <Card>
        <CardHeader>
          <CardTitle>Absensi Murid</CardTitle>
          <CardDescription>
            Daftar absensi murid untuk jadwal ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AbsenMuridTable params={params} />
        </CardContent>
      </Card>
    </article>
  );
}
