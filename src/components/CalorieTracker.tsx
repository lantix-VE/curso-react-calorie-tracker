import type { Activity } from "../types";
import { useMemo } from "react";
import CaloriesDisplay from "./CaloriesDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};
export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(() => {
    return activities.reduce(
      (total, act) => (act.category === 1 ? (total += act.calories) : total),
      0
    );
  }, [activities]);
  const caloriesBurned = useMemo(() => {
    return activities.reduce(
      (total, act) => (act.category === 2 ? (total += act.calories) : total),
      0
    );
  }, [activities]);
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay nombre="Consumidas" calories={caloriesConsumed} />
        <CaloriesDisplay nombre="Quemadas" calories={caloriesBurned} />
        <CaloriesDisplay
          nombre="Total"
          calories={caloriesConsumed - caloriesBurned}
        />
      </div>
    </>
  );
}
