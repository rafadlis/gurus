import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClassCardsSkeleton() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <Skeleton className="h-9 w-9 rounded-md" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
