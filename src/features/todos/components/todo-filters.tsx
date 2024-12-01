import { filters } from "../constants.ts";
import { TodoFilter } from "../types.ts";

interface TodoFiltersProps {
  checkedFilter: TodoFilter;
  handleChange: (filter: TodoFilter) => void;
}

export default function TodoFilters({
  handleChange,
  checkedFilter,
}: TodoFiltersProps) {
  return (
    <>
      {filters.map((filter) => (
        <label key={filter}>
          <input
            type="radio"
            name={filter}
            checked={filter === checkedFilter}
            onChange={() => handleChange(filter)}
          />
          {filter}
        </label>
      ))}
    </>
  );
}
