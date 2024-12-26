import { createFileRoute } from "@tanstack/react-router";

import { demoStore, useCount, useName } from "../stores/store";

export const Route = createFileRoute("/store-learn")({
  component: () => <StoreLearn />,
});

const storeActions = [
  { type: "INCREMENT" },
  { type: "DECREMENT" },
  { type: "INCREMENT_BY", value: 5 },
  { type: "DECREMENT_BY", value: 5 },
] as const;

function StoreLearn() {
  const count = useCount();
  const name = useName();

  return (
    <div className="text-white p-6 bg-gray-800 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">XState Learn</h1>
      <p className="text-xl mb-4">Current count: {count}</p>
      <div className="space-x-2 mb-4">
        {storeActions.map((action) => (
          <button
            key={action.type}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => demoStore.send(action)}
          >
            {action.type.split("_").join(" ")}
          </button>
        ))}
      </div>
      <div className="pb-5">Input box content: {name}</div>
      <input
        type="text"
        value={name}
        onChange={(e) =>
          demoStore.send({ type: "CHANGE_NAME", name: e.target.value })
        }
        className="bg-gray-700 text-white p-2 rounded"
      />
    </div>
  );
}
