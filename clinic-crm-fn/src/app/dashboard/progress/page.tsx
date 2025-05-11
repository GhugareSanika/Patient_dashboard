import { WeightChart } from "@/components/dashboard/charts/WeightChart";
import { ProgressCard } from "@/components/dashboard/cards/ProgressCard";
import { getProgressData } from "@/lib/api/progess";

export default async function ProgressPage() {
  const progressData = await getProgressData();

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <ProgressCard
          currentWeight={progressData.currentWeight}
          goalWeight={progressData.goalWeight}
          startWeight={progressData.startWeight}
          showDetails
        />
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold leading-none tracking-tight">BMI</h3>
          <p className="text-4xl font-bold mt-4">{progressData.bmi}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {progressData.bmiCategory}
          </p>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <WeightChart data={progressData.history} />
      </div>
    </div>
  );
}
