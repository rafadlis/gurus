import { Suspense } from "react";
import { ClassCardsComponent } from "@/app/dashboard/_components/class-cards-component";
import { ClassCardsSkeleton } from "@/app/dashboard/_components/class-cards-skeleton";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { NewJadwalDialog } from "@/app/dashboard/_components/new-jadwal-dialog";

export default function DashboardPage() {
  return (
    <article className="flex flex-col gap-3">
      <DashboardHeader />
      <section className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-md font-bold">Jadwal Kelas Terdekat</h1>
            <p className="text-sm text-muted-foreground">
              Kamu bisa melihat jadwal kelas terdekat di sini dan mengaturnya.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <NewJadwalDialog />
            <Button variant="ghost">
              <span className="max-md:hidden">Lihat Lebih</span>
              <ArrowRight />
            </Button>
          </div>
        </div>
        <Suspense fallback={<ClassCardsSkeleton />}>
          <ClassCardsComponent />
        </Suspense>
      </section>
    </article>
  );
}
