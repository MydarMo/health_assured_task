import { useState, useEffect } from "react";
import { AbsenceWithConflict } from "../interfaces/absences";
import { getAbsencesWithConflicts } from "../api/absences";

export function useAbsencesWithConflicts() {
  const [absences, setAbsences] = useState<AbsenceWithConflict[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAbsencesWithConflicts = async () => {
      try {
        setLoading(true);
        const absencesWithConflict = await getAbsencesWithConflicts();
        setAbsences(absencesWithConflict);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsencesWithConflicts();
  }, []);

  return { absences, loading, error };
}
