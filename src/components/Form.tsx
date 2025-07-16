import { useEffect, useState, type Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Activity } from "../types";
import { categories } from "../data/category";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducers";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
export default function form({ dispatch, state }: FormProps) {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };

  useEffect(() => {
    if (state.activeId) {
      const activityToEdit = state.activities.filter(
        (activity) => state.activeId === activity.id
      )[0];
      setActivity(activityToEdit);
    }
  }, [state.activeId]);
  const [activity, setActivity] = useState<Activity>({
    ...initialState,
  });
  const nombreCatActiva = categories.find(
    (cat) => cat.id === activity.category
  )?.name;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    const valueActivity = isNumberField ? +e.target.value : e.target.value;
    setActivity({
      ...activity,
      [e.target.id]: valueActivity,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  };

  const isActivityValid = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };
  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría
        </label>
        <select
          id="category"
          className="border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:{" "}
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicletas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:{" "}
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. Ej. 300 o 500 "
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full  p-2 font-bold uppercase text-white disabled:opacity-20"
        value={`Guardar ${nombreCatActiva}`}
        onChange={handleChange}
        disabled={!isActivityValid()}
      />
    </form>
  );
}
