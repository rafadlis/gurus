"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDaftarKelas } from "@/app/dashboard/_lib/get-daftar-kelas";
import { getDaftarMapel } from "@/app/dashboard/_lib/get-daftar-mapel";
import { createJadwal } from "@/app/dashboard/_actions/create-jadwal";
import { toast } from "sonner";
import { useState } from "react";
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function NewJadwalDialog() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewJadwalDialogComponent />
    </QueryClientProvider>
  );
}

const jadwalSchema = z.object({
  kelas_id: z.coerce.number({
    required_error: "Silakan pilih kelas",
  }),
  mapel_id: z.coerce.number({
    required_error: "Silakan pilih mata pelajaran",
  }),
  waktu_mulai: z.string({
    required_error: "Silakan pilih waktu mulai",
  }),
  waktu_selesai: z.string({
    required_error: "Silakan pilih waktu selesai",
  }),
});

type JadwalFormValues = z.infer<typeof jadwalSchema>;

const defaultValues: Partial<JadwalFormValues> = {
  kelas_id: undefined,
  mapel_id: undefined,
  waktu_mulai: "",
  waktu_selesai: "",
};

export function NewJadwalDialogComponent() {
  const [open, setOpen] = useState(false);
  const form = useForm<JadwalFormValues>({
    resolver: zodResolver(jadwalSchema),
    defaultValues,
  });

  const kelasQuery = useQuery({
    queryKey: ["daftar-kelas"],
    queryFn: async () => await getDaftarKelas(),
  });

  const mapelQuery = useQuery({
    queryKey: ["daftar-mapel"],
    queryFn: () => getDaftarMapel(),
  });

  console.log(mapelQuery.data, kelasQuery.data);

  async function onSubmit(data: JadwalFormValues) {
    try {
      await createJadwal(data);
      toast.success("Jadwal berhasil dibuat");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal membuat jadwal"
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="max-md:hidden">Buat Jadwal</span>
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buat Jadwal</DialogTitle>
          <DialogDescription>
            Buat jadwal baru untuk kelas yang kamu inginkan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="kelas_id"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select
                    onValueChange={(value) => onChange(Number(value))}
                    value={value?.toString()}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            kelasQuery.isLoading ? "Memuat..." : "Pilih kelas"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelasQuery.data?.map((kelas) => (
                        <SelectItem key={kelas.id} value={kelas.id.toString()}>
                          {kelas.nama_kelas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mapel_id"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Mata Pelajaran</FormLabel>
                  <Select
                    onValueChange={(value) => onChange(Number(value))}
                    value={value?.toString()}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            mapelQuery.isLoading
                              ? "Memuat..."
                              : "Pilih mata pelajaran"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mapelQuery.data?.map((mapel) => (
                        <SelectItem key={mapel.id} value={mapel.id.toString()}>
                          {mapel.mata_pelajaran}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktu_mulai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Mulai</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktu_selesai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Selesai</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
