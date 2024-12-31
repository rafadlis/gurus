import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function ClassCardsSkeleton() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex-grow">
          <CardHeader>
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Separator orientation="vertical" className="h-4" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-9" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
