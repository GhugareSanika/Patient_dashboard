import mongoose, { Schema, Document } from "mongoose";

export interface IWeightEntry {
  date: Date;
  weight: number; // in pounds or kg (specify unit in your app)
  userId: string; // reference to the user
  notes?: string;
}

export interface IProgress extends Document {
  userId: string;
  currentWeight: number;
  startWeight: number;
  goalWeight: number;
  height: number; // in inches or cm (for BMI calculation)
  weightHistory: IWeightEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const WeightEntrySchema = new Schema<IWeightEntry>({
  date: { type: Date, required: true, default: Date.now },
  weight: { type: Number, required: true },
  userId: { type: String, required: true },
  notes: { type: String },
});

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: String, required: true, unique: true },
    currentWeight: { type: Number, required: true },
    startWeight: { type: Number, required: true },
    goalWeight: { type: Number, required: true },
    height: { type: Number, required: true },
    weightHistory: [WeightEntrySchema],
  },
  {
    timestamps: true,
  }
);

// Add index for faster queries
ProgressSchema.index({ userId: 1 });
WeightEntrySchema.index({ userId: 1, date: 1 });

export const ProgressModel = mongoose.model<IProgress>(
  "Progress",
  ProgressSchema
);
