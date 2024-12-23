import { createFileRoute } from "@tanstack/react-router";

import { store, useCount, useName } from "../stores/store";

export const Route = createFileRoute("/store-learn")({
  component: () => <StoreLearn />,
});

function StoreLearn() {
  const count = useCount();
  const name = useName();

  const incrementCount = () => store.send({ type: "INCREMENT" });
  const decrementCount = () => store.send({ type: "DECREMENT" });
  const incrementCountBy = () => store.send({ type: "INCREMENT_BY", value: 5 });
  const decrementCountBy = () => store.send({ type: "DECREMENT_BY", value: 5 });
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    store.send({ type: "CHANGE_NAME", name: e.target.value });

  return (
    <div className="text-white p-6 bg-gray-800 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Store Learn</h1>
      <p className="text-xl mb-4">Current count: {count}</p>
      <div className="space-x-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={incrementCount}
        >
          Increment
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={decrementCount}
        >
          Decrement
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={incrementCountBy}
        >
          Increment by 5
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={decrementCountBy}
        >
          Decrement by 5
        </button>
      </div>
      <div className="pb-5">Input box content: {name}</div>
      <input
        type="text"
        value={name}
        onChange={changeName}
        className="bg-gray-700 text-white p-2 rounded"
      />
    </div>
  );
}
