import { useState, useEffect } from "react";
import {
  ApprovalStatus,
  AbsenceDisplayedData,
  AbsenceWithConflict,
} from "../interfaces/absences";
import { calculateEndDate, formatDate } from "../helpers/format-date";

export function useDisplayedData(data: AbsenceWithConflict[]) {
  const [displayedData, setDisplayedData] = useState<AbsenceDisplayedData[]>(
    []
  );

  useEffect(() => {
    const createDisplayedData = data.map((data) => {
      return {
        ...data,
        startDate: formatDate(new Date(data.startDate)),
        endDate: formatDate(calculateEndDate(data.startDate, data.days)),
        employeeFullName: `${data.employee.firstName} ${data.employee.lastName}`,
        approvalStatus: data.approved
          ? ApprovalStatus.APPROVED
          : ApprovalStatus.NOT_APPROVED,
      };
    });

    setDisplayedData(createDisplayedData);
  }, [data]);

  return { displayedData };
}
