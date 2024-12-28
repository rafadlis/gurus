import { Suspense } from "react";
import { ClassCardsComponent } from "@/app/dashboard/_components/class-cards-component";
import { ClassCardsSkeleton } from "@/app/dashboard/_components/class-cards-skeleton";
import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-3">
      <DashboardHeader />
      <Suspense fallback={<ClassCardsSkeleton />}>
        <ClassCardsComponent />
      </Suspense>
    </section>
  );
}
