import Form from "./components/Form";
import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./components/ActivityList";
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button
            className="bg-black text-white p-2 rounded-lg font-bold uppercase disabled:opacity-15"
            onClick={() => dispatch({ type: "clear-activities" })}
            disabled={canRestartApp}
          >
            Reiniciar Contador
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
