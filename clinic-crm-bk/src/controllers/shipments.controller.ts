import { Request, Response } from "express";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  remainingDoses: number;
}

interface Shipment {
  id: string;
  shippedDate: string;
  expectedDate: string;
  carrier: string;
  trackingNumber: string;
  status: string;
  medication: Medication;
}

// Mock data - replace with database operations
const shipments: Shipment[] = [
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

export const getShipments = (req: Request, res: Response): void => {
  try {
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipments" });
  }
};

export const getShipmentById = (req: Request, res: Response): void => {
  try {
    const shipment = shipments.find((s) => s.id === req.params.id);
    if (!shipment) {
      res.status(404).json({ message: "Shipment not found" });
      return;
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipment" });
  }
};
