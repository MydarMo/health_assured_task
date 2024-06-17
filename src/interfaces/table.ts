export type SortOrder = "asc" | "desc";

export interface Column<T> {
  label: string;
  accessor: keyof T;
  sortable: boolean;
  order?: SortOrder;
}
