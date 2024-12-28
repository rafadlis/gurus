"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="gap-1.5">
      <ArrowLeft className="h-4 w-4" />
      Kembali
    </Button>
  );
}
