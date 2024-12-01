import { useCallback } from "react";
import { z } from "zod";

import { useForm } from "@tanstack/react-form";
import { MutateOptions } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { Todo } from "../types.ts";

interface TodoInputFormProps {
  createNewTodo: (
    variables: Todo,
    options?: MutateOptions<Todo, Error, Todo, unknown> | undefined
  ) => void;
}

export default function TodoInputForm({ createNewTodo }: TodoInputFormProps) {
  const form = useForm({
    defaultValues: { title: "" },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        title: z
          .string()
          .min(5, "Enter valid string")
          .max(100, "Lower length of string"),
      }),
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createNewTodo(
        {
          id: Math.random(),
          userId: 1,
          title: form.state.values.title,
          completed: false,
        },
        {
          onSuccess: () => form.reset(),
          onError: (error) => console.error(error.message),
        }
      );
    },
    [createNewTodo, form]
  );

  return (
    <form onSubmit={handleSubmit}>
      <form.Field
        name="title"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      />
    </form>
  );
}
