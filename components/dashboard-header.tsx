import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DashboardBreadcrumb,
  DashboardBreadcrumbSkeleton,
} from "@/components/dashboard-breadcrumb";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-2">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4 mr-1" />
      <Suspense fallback={<DashboardBreadcrumbSkeleton />}>
        <DashboardBreadcrumb />
      </Suspense>
    </header>
  );
}
