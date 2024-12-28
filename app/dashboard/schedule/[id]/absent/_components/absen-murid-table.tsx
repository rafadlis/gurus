import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAbsenMurid } from "../_lib/get-absen-murid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AbsenMuridTable({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No. Absen</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Waktu</TableHead>
          </TableRow>
        </TableHeader>
        <Suspense fallback={<AbsenMuridTableBodySkeleton />}>
          <AbsenMuridTableBody params={params} />
        </Suspense>
      </Table>
    </div>
  );
}

export async function AbsenMuridTableBody({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAbsenMurid(id);

  return (
    <TableBody>
      {data?.map((absen) => (
        <TableRow key={absen.id}>
          <TableCell>{absen.Murid?.nomor_absen}</TableCell>
          <TableCell>{absen.Murid?.nama}</TableCell>
          <TableCell>
            <Select defaultValue={absen.status_absen || undefined}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hadir">Hadir</SelectItem>
                <SelectItem value="ijin">Ijin</SelectItem>
                <SelectItem value="sakit">Sakit</SelectItem>
                <SelectItem value="alpha">Alpha</SelectItem>
                <SelectItem value="tugas">Tugas</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            {new Date(absen.created_at).toLocaleString("id-ID", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export function AbsenMuridTableBodySkeleton() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[180px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[100px]" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
