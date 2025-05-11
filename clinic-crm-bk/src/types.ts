export interface ProgressData {
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
  bmi: number;
  bmiCategory: string;
  history: {
    date: string;
    weight: number;
  }[];
}

export type ShipmentStatus = "delivered" | "in-transit" | "upcoming";

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  remainingDoses: number;
}

export interface Shipment {
  id: string;
  shippedDate: string;
  expectedDate: string;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
  medication: Medication;
}
