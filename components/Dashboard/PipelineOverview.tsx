import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

interface PipelineOverviewProps {
  stages: PipelineStage[];
}

export function PipelineOverview({ stages }: PipelineOverviewProps) {
  const total = stages.reduce((acc, stage) => acc + stage.count, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Active Hiring Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual pipeline bar */}
        <div className="flex h-3 rounded-full overflow-hidden bg-muted">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={cn("transition-all", stage.color)}
              style={{ width: `${(stage.count / total) * 100}%` }}
            />
          ))}
        </div>

        {/* Stage details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div key={stage.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                <span className="text-sm text-muted-foreground">
                  {stage.name}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stage.count}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
