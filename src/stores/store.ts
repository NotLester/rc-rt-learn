import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";

export const store = createStore({
  context: {
    count: 0,
    name: "Lester",
  },
  on: {
    INCREMENT: {
      count: (context) => context.count + 1,
    },
    DECREMENT: {
      count: (context) => context.count - 1,
    },
    INCREMENT_BY: {
      count: (context, event: { value: number }) => context.count + event.value,
    },
    DECREMENT_BY: {
      count: (context, event: { value: number }) => context.count - event.value,
    },
    CHANGE_NAME: {
      name: (_, event: { name: string }) => event.name,
    },
  },
});

export function useCount() {
  return useSelector(store, (state) => state.context.count);
}
export function useName() {
  return useSelector(store, (state) => state.context.name);
}

store.subscribe((snapshot) => console.log(snapshot.context));
