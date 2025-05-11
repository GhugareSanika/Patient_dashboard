import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Scale, Target, Ruler } from "lucide-react";

interface OverviewCardProps {
  currentWeight: number;
  goalWeight: number;
  bmi: number;
}

export function OverviewCard({
  currentWeight,
  goalWeight,
  bmi,
}: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Status</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Scale className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Current Weight</p>
            <p className="text-2xl font-semibold">{currentWeight} lbs</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Target className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Goal Weight</p>
            <p className="text-2xl font-semibold">{goalWeight} lbs</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Ruler className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">BMI</p>
            <p className="text-2xl font-semibold">{bmi}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
