import React from "react";
import { AbsenceDisplayedData } from "../interfaces/absences";
import { useAbsencesWithConflicts } from "../hooks/use-absence-with-conflict";
import { useDisplayedData } from "../hooks/use-displayed-data";
import Table from "./table";

interface Column {
  label: string;
  accessor: keyof AbsenceDisplayedData;
  sortable: boolean;
}

export const AbsenceTable = () => {
  const { absences, loading, error } = useAbsencesWithConflicts();

  const { displayedData } = useDisplayedData(absences);

  const columns: Column[] = [
    { label: "Start Date", accessor: "startDate", sortable: true },
    { label: "End Date", accessor: "endDate", sortable: true },
    { label: "Employee Name", accessor: "employeeFullName", sortable: true },
    { label: "Approval Status", accessor: "approvalStatus", sortable: true },
    { label: "Absence Type", accessor: "absenceType", sortable: true },
  ];

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error.message}</div>;
  }

  return (
    <div data-testid="results" className="table_container">
      <h1>Employee Absences</h1>
      <Table
        caption="All Absences with employee information, approval status, dates, and type"
        data={displayedData}
        columns={columns}
      />
    </div>
  );
};
