import { useMemo, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import useGetAllTodos, {
  getAllTodosQuery,
} from "../../features/todos/api/queries/use-get-all-todos";
import {
  TodoCard,
  TodoFilters,
  TodoInputForm,
} from "../../features/todos/components";
import { Todo, TodoFilter } from "../../features/todos/types";

export const Route = createFileRoute("/todos/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getAllTodosQuery());
  },
  component: () => <Todos />,
});

const TODOSPERPAGE = 10;

function Todos(): React.ReactElement {
  const { todos } = useGetAllTodos();
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTodos = useMemo(() => {
    return (
      todos?.filter((todo) => {
        if (filter === "complete") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
      }) ?? []
    );
  }, [todos, filter]);

  const paginatedTodos = useMemo(() => {
    return filteredTodos.slice(
      (currentPage - 1) * TODOSPERPAGE,
      currentPage * TODOSPERPAGE
    );
  }, [filteredTodos, currentPage]);

  const totalPages = Math.ceil(filteredTodos.length / TODOSPERPAGE);

  if (!todos || !todos.length) {
    return <NoTodos />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            My Todos
          </h1>
          <TodoInputSection />
          <FilterSection
            filteredTodosCount={filteredTodos.length}
            filter={filter}
            setFilter={setFilter}
          />
          <TodoList todos={paginatedTodos} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

function TodoInputSection() {
  return (
    <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Add New Todo
      </h2>
      <TodoInputForm />
    </section>
  );
}

interface FilterSectionProps {
  filteredTodosCount: number;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
}
function FilterSection({
  filteredTodosCount,
  filter,
  setFilter,
}: FilterSectionProps) {
  return (
    <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 pt-3  ">
          Filter Todos
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 pt-2">
          {filteredTodosCount} {filteredTodosCount === 1 ? "todo" : "todos"}
        </span>
      </div>
      <TodoFilters handleChange={setFilter} checkedFilter={filter} />
    </section>
  );
}

interface TodoListProps {
  todos: Todo[];
}
function TodoList({ todos }: TodoListProps) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="transition-all duration-200 hover:translate-x-1"
          >
            <TodoCard todo={todo} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}
function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationControlsProps) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  return (
    <section className="flex justify-between items-center pt-4">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Page</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={handlePageInput}
          className="w-12 text-center text-sm text-gray-700 bg-gray-200 rounded"
        />
        <span className="text-sm text-gray-500">of {totalPages}</span>
      </div>
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </section>
  );
}

function NoTodos() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          No Todos Yet
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Start by adding a new todo above
        </p>
      </div>
    </div>
  );
}
