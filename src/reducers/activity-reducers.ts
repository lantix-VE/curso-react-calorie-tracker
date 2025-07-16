import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | { type: "set-activeId"; payload: { id: Activity["id"] } };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initialState: ActivityState = {
  activities: [],
  activeId: "",
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
  return state;
};
