"use client";

import Link from "next/link";
import {
  ChalkboardTeacher,
  ClockCountdown,
  GraduationCap,
  House,
  ListChecks,
  Pulse,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/dashboard-sidebar-user";
import { Button } from "./ui/button";

// This is sample data that should be replaced with real user data from your auth system
const user = {
  name: "Guru Indonesia",
  email: "guru@sekolah.id",
  avatar: "",
};

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Button size="icon">
            <ChalkboardTeacher weight="fill" />
          </Button>
          <div className="flex flex-col gap-0">
            <span className="text-md font-semibold">Aku Guru</span>
            <span className="text-xs text-muted-foreground">
              Sistem Manajemen Kelas
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <House weight="duotone" />
                    <span>Dasbor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/schedule">
                    <ClockCountdown weight="duotone" />
                    <span>Jadwal Kelas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/students">
                    <Users weight="duotone" />
                    <span>Daftar Murid</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Penilaian</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/attendance">
                    <ListChecks weight="duotone" />
                    <span>Absensi</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/activity">
                    <Pulse weight="duotone" />
                    <span>Keaktifan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/grades">
                    <GraduationCap weight="duotone" />
                    <span>Nilai</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
