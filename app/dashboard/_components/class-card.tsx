import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JadwalKelasType } from "../_lib/get-jadwal-kelas";
import { cn } from "@/lib/utils";
import {
  FadersHorizontal,
  ListChecks,
  Pulse,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export function ClassCard({ data }: { data: JadwalKelasType[0] }) {
  const isAbsenExist = data.AbsenMurid.some(
    (absen) => absen.status_absen !== null
  );
  const jumlahMuridBelumAbsen = data.AbsenMurid.filter(
    (absen) => absen.status_absen === null
  ).length;

  const isNilaiKeaktifanExist = data.NilaiKeaktifan.some(
    (keaktifan) => keaktifan.nilai !== null
  );

  const jumlahMuridAktif = data.NilaiKeaktifan.filter(
    (keaktifan) => keaktifan.nilai !== null
  ).length;

  // Determine status colors and animations
  const getStatusStyles = () => {
    const absenStyles = !isAbsenExist
      ? {
          button: "border-destructive",
          wrapper:
            "before:bg-destructive/20 before:animate-ping before:scale-75",
          icon: "text-destructive",
        }
      : jumlahMuridBelumAbsen === 0
        ? {
            button: "border-success",
            wrapper: "",
            icon: "text-success",
          }
        : {
            button: "border-warning",
            wrapper: "before:bg-warning/20",
            icon: "text-warning",
          };

    const keaktifanStyles = !isNilaiKeaktifanExist
      ? {
          button: "",
          icon: "text-muted-foreground",
        }
      : jumlahMuridAktif === data.NilaiKeaktifan.length
        ? {
            button: "text-success border-success",
            icon: "text-success",
          }
        : {
            button: "text-warning border-warning",
            icon: "text-warning",
          };

    return {
      absen: absenStyles,
      keaktifan: keaktifanStyles,
    };
  };

  const statusStyles = getStatusStyles();

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          {new Date(data.waktu_mulai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }) || "00:00"}{" "}
          -{" "}
          {new Date(data.waktu_selesai).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }) || "00:00"}
          <Separator orientation="vertical" className="h-4" />
          <span>{data.Kelas?.nama_kelas}</span>
        </CardTitle>
        <CardDescription>
          {data.PenempatanGuru?.Sekolah?.nama_sekolah}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <div
          className={cn(
            "relative before:absolute before:-inset-[2px] before:rounded-md before:origin-center",
            statusStyles.absen.wrapper
          )}
        >
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-2 relative z-10", statusStyles.absen.button)}
            asChild
          >
            <Link href={`/dashboard/schedule/${data.id}/absent`}>
              <ListChecks className={statusStyles.absen.icon} />
              <span className="max-md:hidden">Absen</span>
            </Link>
          </Button>
        </div>
        <Button
          size="sm"
          variant="outline"
          className={cn("gap-2 bg-none z-20", statusStyles.keaktifan.button)}
          asChild
        >
          <Link href={`/dashboard/schedule/${data.id}/activity`}>
            <Pulse className={statusStyles.keaktifan.icon} />
            <span className="max-md:hidden">Keaktifan</span>
          </Link>
        </Button>
        <Button size="sm" variant="outline" className="space-y-0">
          <FadersHorizontal />
        </Button>
      </CardContent>
    </Card>
  );
}
