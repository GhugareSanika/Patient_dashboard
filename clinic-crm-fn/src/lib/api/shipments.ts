import { Shipment, Medication } from "../types";

// In a real app, this would fetch from your backend API
export async function getShipments(): Promise<Shipment[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: "1",
      shippedDate: "2023-05-15",
      expectedDate: "2023-05-20",
      carrier: "USPS",
      trackingNumber: "123456789",
      status: "delivered",
      medication: {
        name: "Semaglutide",
        dosage: "0.5 mg",
        frequency: "Once weekly",
        remainingDoses: 0,
      },
    },
    {
      id: "2",
      shippedDate: "2023-06-12",
      expectedDate: "2023-06-17",
      carrier: "FedEx",
      trackingNumber: "987654321",
      status: "in-transit",
      medication: {
        name: "Semaglutide",
        dosage: "1.0 mg",
        frequency: "Once weekly",
        remainingDoses: 2,
      },
    },
    {
      id: "3",
      shippedDate: "",
      expectedDate: "2023-07-10",
      carrier: "",
      trackingNumber: "",
      status: "upcoming",
      medication: {
        name: "Semaglutide",
        dosage: "1.7 mg",
        frequency: "Once weekly",
        remainingDoses: 4,
      },
    },
  ];
}

export async function getShipmentById(
  id: string
): Promise<Shipment | undefined> {
  const shipments = await getShipments();
  return shipments.find((shipment) => shipment.id === id);
}
