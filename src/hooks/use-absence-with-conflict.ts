import { useState, useEffect } from "react";
import { AbsenceWithConflict, Filters } from "../interfaces/absences";
import { getAbsencesWithConflicts } from "../api/absences";

export function useAbsencesWithConflicts(filter?: Filters | null) {
  const [absences, setAbsences] = useState<AbsenceWithConflict[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAbsencesWithConflicts = async () => {
      try {
        setLoading(true);
        const absencesWithConflict = await getAbsencesWithConflicts(filter);
        setAbsences(absencesWithConflict);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsencesWithConflicts();
  }, [filter]);

  return { absences, loading, error };
}
