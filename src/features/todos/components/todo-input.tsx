import { useCallback } from "react";
import { z } from "zod";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

import useCreateTodo from "../api/mutations/use-create-todo.ts";

export default function TodoInputForm() {
  const { mutate: createNewTodo } = useCreateTodo();

  const form = useForm({
    defaultValues: { title: "" },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        title: z
          .string()
          .min(5, "Enter at least 5 characters")
          .max(100, "Title must be less than 100 characters"),
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-2">
        <form.Field
          name="title"
          children={(field) => (
            <div className="relative">
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="What needs to be done?"
                className={`
                  w-full px-4 py-3 rounded-lg
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-2 transition-colors duration-200
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900
                  ${
                    field.state.meta.errors.length
                      ? "border-red-300 dark:border-red-900 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  }
                `}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="absolute -bottom-6 left-0 text-sm text-red-500 dark:text-red-400">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`
                  px-6 py-2 rounded-lg font-medium
                  transition-all duration-200
                  ${
                    canSubmit
                      ? "bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Adding...</span>
                  </span>
                ) : (
                  "Add Todo"
                )}
              </button>
            </div>
          )}
        />
      </div>
    </form>
  );
}
