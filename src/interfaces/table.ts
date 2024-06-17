import { ReactNode } from "react";

export type SortOrder = "asc" | "desc";

export interface Column<T> {
  label: string;
  accessor: keyof T;
  sortable: boolean;
  order?: SortOrder;
  handleDataClick?: (data: T) => void;
  cell?: (data: T) => ReactNode;
}
