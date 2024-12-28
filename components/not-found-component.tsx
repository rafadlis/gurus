import { Warning } from "@phosphor-icons/react/dist/ssr";
import { BackButton } from "./back-button";

interface NotFoundComponentProps {
  title: string;
  description: string;
}

export function NotFoundComponent({
  title,
  description,
}: NotFoundComponentProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 p-3">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <Warning size={28} className="text-muted-foreground" weight="duotone" />
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description} <br />
          Silakan periksa kembali URL atau kembali ke halaman sebelumnya.
        </p>
      </div>

      <BackButton />
    </div>
  );
}
