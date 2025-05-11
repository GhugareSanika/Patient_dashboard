import mongoose, { Schema, Document } from "mongoose";

export enum ShipmentStatus {
  PROCESSING = "processing",
  SHIPPED = "shipped",
  IN_TRANSIT = "in-transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IMedication {
  name: string;
  dosage: string;
  quantity: number;
  frequency: string; // e.g., "Once weekly"
  refillsRemaining: number;
}

export interface IShipment extends Document {
  userId: string;
  shipmentDate: Date;
  expectedDeliveryDate: Date;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
  medications: IMedication[];
  createdAt: Date;
  updatedAt: Date;
}

const MedicationSchema = new Schema<IMedication>({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  quantity: { type: Number, required: true },
  frequency: { type: String, required: true },
  refillsRemaining: { type: Number, default: 0 },
});

const ShipmentSchema = new Schema<IShipment>(
  {
    userId: { type: String, required: true },
    shipmentDate: { type: Date },
    expectedDeliveryDate: { type: Date, required: true },
    carrier: { type: String },
    trackingNumber: { type: String },
    status: {
      type: String,
      enum: Object.values(ShipmentStatus),
      default: ShipmentStatus.PROCESSING,
    },
    medications: [MedicationSchema],
  },
  {
    timestamps: true,
  }
);

// Add indexes for faster queries
ShipmentSchema.index({ userId: 1 });
ShipmentSchema.index({ status: 1 });
ShipmentSchema.index({ expectedDeliveryDate: 1 });

export const ShipmentModel = mongoose.model<IShipment>(
  "Shipment",
  ShipmentSchema
);
