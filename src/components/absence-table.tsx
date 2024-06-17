import React from "react";
import { AbsenceDisplayedData } from "../interfaces/absences";
import { useAbsencesWithConflicts } from "../hooks/use-absence-with-conflict";
import { useDisplayedData } from "../hooks/use-displayed-data";
import Table from "./table";
import { useFilter } from "../hooks/use-filter";
import { Column } from "../interfaces/table";
import Chip from "./chip";

export const AbsenceTable = () => {
  const { filter, updateFilter } = useFilter();
  const { absences, loading, error } = useAbsencesWithConflicts(filter);
  const { displayedData } = useDisplayedData(absences);

  const handleEmployeeClick = (data: AbsenceDisplayedData) => {
    updateFilter({ ...filter, employeeId: data.employee.id });
  };

  const handleResetFilter = () => {
    updateFilter(null);
  };

  const absenceConflictStatus = (data: AbsenceDisplayedData) => (
    <div>
      <p>
        <span style={{ marginRight: "3px" }}>{data.employeeFullName}</span>
        {data.conflicts && <Chip label="Conflicts" color="error" />}
      </p>
    </div>
  );

  const columns: Column<AbsenceDisplayedData>[] = [
    { label: "Start Date", accessor: "startDate", sortable: true },
    { label: "End Date", accessor: "endDate", sortable: true },
    {
      label: "Employee Name",
      accessor: "employeeFullName",
      sortable: true,
      handleDataClick: handleEmployeeClick,
      cell: (data) => absenceConflictStatus(data),
    },
    { label: "Approval Status", accessor: "approvalStatus", sortable: false },
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
      <div className="heading-section">
        <h1>Employee Absences</h1>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </div>

      <Table
        caption="All Absences with employee information, approval status, dates, and type"
        data={displayedData}
        columns={columns}
      />
    </div>
  );
};
