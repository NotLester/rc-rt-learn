import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';

export const demoStore = createStore({
  context: {
    count: 0,
    name: "Lester",
  },
  on: {
    INCREMENT: {
      count: ({ count }) => count + 1,
    },
    DECREMENT: {
      count: ({ count }) => count - 1,
    },
    INCREMENT_BY: {
      count: ({ count }, event: { value: number }) => count + event.value,
    },
    DECREMENT_BY: {
      count: ({ count }, event: { value: number }) => count - event.value,
    },
    CHANGE_NAME: {
      name: (_, event: { name: string }) => event.name,
    },
  },
});

demoStore.subscribe((snapshot) => console.log(snapshot.context));

export const useCount = () =>
  useSelector(demoStore, (state) => state.context.count);
export const useName = () =>
  useSelector(demoStore, (state) => state.context.name);
