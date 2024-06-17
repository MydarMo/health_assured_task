import { useState, useEffect } from "react";
import { SortOrder } from "../interfaces/table";

export function useSort<T>(data: T[], key?: keyof T, order: SortOrder = "asc"): T[] {
  const [sortedData, setSortedData] = useState<T[]>([]);

  useEffect(() => {
    if (key) {
      const sortedArray = [...data].sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA instanceof Date && valueB instanceof Date) {
          return order === "asc"
            ? valueA.getTime() - valueB.getTime()
            : valueB.getTime() - valueA.getTime();
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          return order === "asc" ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === "string" && typeof valueB === "string") {
          return order === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return 0;
        }
      });

      setSortedData(sortedArray);
    }
    else {
      setSortedData(data)
    }
  }, [data, key, order]);

  return sortedData;
}
