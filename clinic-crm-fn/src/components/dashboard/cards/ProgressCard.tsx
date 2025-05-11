import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
  showDetails?: boolean;
}

export function ProgressCard({
  currentWeight,
  startWeight,
  goalWeight,
  showDetails = false,
}: ProgressCardProps) {
  const totalLoss = startWeight - goalWeight;
  const currentLoss = startWeight - currentWeight;
  const progress = Math.round((currentLoss / totalLoss) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Weight Loss Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {showDetails && (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Start</p>
              <p className="text-lg font-semibold">{startWeight} lbs</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="text-lg font-semibold">{currentWeight} lbs</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Goal</p>
              <p className="text-lg font-semibold">{goalWeight} lbs</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
