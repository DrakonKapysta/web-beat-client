import React, { useEffect } from "react";

export type UseDebounce = <T>(value: T, wait?: number) => T;

export const useDebounce: UseDebounce = <T>(value: T, wait: number = 300) => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);

  return debouncedValue;
};
