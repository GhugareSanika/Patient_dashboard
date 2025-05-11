import { ProgressData } from "../types";

// In a real app, this would fetch from your backend API
export async function getProgressData(): Promise<ProgressData> {
  // Mock data - replace with actual API call
  return {
    currentWeight: 185,
    startWeight: 210,
    goalWeight: 160,
    bmi: 28.3,
    bmiCategory: "Overweight",
    history: [
      { date: "2023-01-01", weight: 210 },
      { date: "2023-02-01", weight: 205 },
      { date: "2023-03-01", weight: 200 },
      { date: "2023-04-01", weight: 195 },
      { date: "2023-05-01", weight: 190 },
      { date: "2023-06-01", weight: 185 },
    ],
  };
}
