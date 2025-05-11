import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package, PackageCheck, PackageX, Package2 } from "lucide-react";
import { Shipment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const getStatusIcon = () => {
    switch (shipment.status) {
      case "delivered":
        return <PackageCheck className="h-6 w-6 text-green-500" />;
      case "in-transit":
        return <Package className="h-6 w-6 text-yellow-500" />;
      case "upcoming":
        return <Package2 className="h-6 w-6 text-blue-500" />;
      default:
        return <PackageX className="h-6 w-6 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (shipment.status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in-transit":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Shipment #{shipment.id}</CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge className={getStatusColor()}>
            {shipment.status.toUpperCase()}
          </Badge>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Expected</span>
          <span className="text-sm font-medium">
            {shipment.expectedDate || "Pending"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Medication</span>
          <span className="text-sm font-medium">
            {shipment.medication.name} ({shipment.medication.dosage})
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
