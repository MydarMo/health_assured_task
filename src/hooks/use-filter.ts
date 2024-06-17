import { useState } from "react";
import { Filters } from "../interfaces/absences";

export const useFilter = () => {
    const [filter, setFilter] = useState<Filters | null>({
        employeeId: '',
        endDate: undefined,
        startDate: undefined,
        approvalStatus: undefined
      });
  
    return {
      filter,
      updateFilter: setFilter
    };
  };