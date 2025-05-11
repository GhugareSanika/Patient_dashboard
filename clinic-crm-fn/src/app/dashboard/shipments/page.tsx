import { ShipmentCard } from "@/components/dashboard/cards/ShipmentCard";
import { getShipments } from "@/lib/api/shipments";
import Link from "next/link";
import { Shipment } from "@/lib/types";

export default async function ShipmentsPage() {
  const shipments = await getShipments();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Shipments</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shipments.map((shipment: Shipment) => (
          <Link key={shipment.id} href={`/dashboard/shipments/${shipment.id}`}>
            <ShipmentCard shipment={shipment} />
          </Link>
        ))}
      </div>
    </div>
  );
}
