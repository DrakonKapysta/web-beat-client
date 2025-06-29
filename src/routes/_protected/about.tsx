import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

export const Route = createFileRoute({
  component: About,
});

function About() {
  const [value, setValue] = useState("");
  const debauncedValue = useDebounce(value, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        className="border border-red-500"
        type="text"
        onChange={handleChange}
      />
      <h2>Text:</h2>
      <p>{debauncedValue}</p>
    </div>
  );
}
