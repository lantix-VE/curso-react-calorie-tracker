import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "clear-activities" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
  idActToDelete: Activity["id"];
};

const dataLocalstorage = (): Activity[] => {
  const activities = localStorage.getItem("activities");

  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: dataLocalstorage(),
  activeId: "",
  idActToDelete: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    const activityToAdd = action.payload.newActivity;
    let updatedActivities = [];
    if (state.activeId !== "") {
      updatedActivities = state.activities.map((activity) => {
        if (activity.id === activityToAdd.id) {
          return { ...activityToAdd };
        }
        return activity;
      });
    } else {
      updatedActivities = [...state.activities, activityToAdd];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    const updatedActivities = state.activities.filter(
      (act) => act.id !== action.payload.id
    );

    let newActiveId = state.activeId;

    if (state.activeId === action.payload.id) {
      newActiveId = "";
    }

    return { ...state, activities: updatedActivities, activeId: newActiveId };
  }

  if (action.type === "clear-activities") {
    return {
      ...state,
      activities: [],
      activeId: "",
    };
  }
  return state;
};
