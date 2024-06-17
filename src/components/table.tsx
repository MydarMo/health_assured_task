import { useState } from "react";
import { useSort } from "../hooks/use-sortable-table";
import { Column, SortOrder } from "../interfaces/table";

interface TableProps<T> {
  caption: string;
  data: T[];
  columns: Column<T>[];
}

const Table = <T,>(props: TableProps<T>) => {
  const { caption, data, columns } = props;
  const [sortKey, setSortKey] = useState<keyof T>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedData = useSort(data, sortKey, sortOrder);

  const handleSort = (key: keyof T) => {
    setSortKey(key);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map(
              ({ accessor, label, sortable }, index: number) => {
                const arrow = sortable
                  ? sortKey === accessor && sortOrder === 'asc' ? 'up'
                    : sortKey === accessor && sortOrder === "desc"
                    ? 'down'
                    : "default"
                  : "";
                return (
                  <th
                    key={index}
                    onClick={() => handleSort(accessor)}
                    className={arrow}
                  >
                    {label}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              {columns.map((column, index: number) => {
                const { accessor, handleDataClick, cell } = column;
                return (
                  <td
                    key={index}
                    onClick={() => handleDataClick && handleDataClick(data)}
                    className={handleDataClick ? "clickable" : ""}
                  >
                    {cell ? cell(data) : (data[accessor] as string)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
