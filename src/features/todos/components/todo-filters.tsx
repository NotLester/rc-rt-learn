import { filters } from '../constants.ts';
import { TodoFilter } from '../types.ts';

interface TodoFiltersProps {
  checkedFilter: TodoFilter;
  handleChange: (filter: TodoFilter) => void;
}

export default function TodoFilters({
  handleChange,
  checkedFilter,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <label
          key={filter}
          className={`
            flex items-center px-4 py-2 rounded-lg cursor-pointer
            transition-all duration-200 select-none
            ${
              filter === checkedFilter
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          <input
            type="radio"
            name="todo-filter"
            value={filter}
            checked={filter === checkedFilter}
            onChange={() => handleChange(filter)}
            className="absolute opacity-0 w-0 h-0"
          />
          <span className="capitalize">{filter}</span>
        </label>
      ))}
    </div>
  );
}
