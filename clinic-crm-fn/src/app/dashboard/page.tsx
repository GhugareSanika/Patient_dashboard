import { OverviewCard } from "@/components/dashboard/cards/OverviewCard";
import { ProgressCard } from "@/components/dashboard/cards/ProgressCard";
import { ShipmentCard } from "@/components/dashboard/cards/ShipmentCard";
import { getProgressData } from "@/lib/api/progess";
import { getShipments } from "@/lib/api/shipments";

export default async function DashboardPage() {
  const progressData = await getProgressData();
  const shipments = await getShipments();

  const nextShipment = shipments.find(
    (shipment) => shipment.status === "upcoming"
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <OverviewCard
        currentWeight={progressData.currentWeight}
        bmi={progressData.bmi}
        goalWeight={progressData.goalWeight}
      />
      <ProgressCard
        currentWeight={progressData.currentWeight}
        goalWeight={progressData.goalWeight}
        startWeight={progressData.startWeight}
      />
      <ShipmentCard shipment={nextShipment} />
    </div>
  );
}
