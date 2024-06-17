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
              ({ accessor, label, order, sortable }, index: number) => {
                const cl = sortable
                  ? sortKey === accessor && order === "asc"
                    ? "up"
                    : sortKey === accessor && order === "desc"
                    ? "down"
                    : "default"
                  : "";
                return (
                  <th
                    key={index}
                    onClick={() => handleSort(accessor)}
                    className={cl}
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
                return <td key={index}>{data[column.accessor] as string}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
