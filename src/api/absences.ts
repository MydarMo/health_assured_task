import { Absence, AbsenceWithConflict } from "../interfaces/absences";
import { Conflict } from "../interfaces/conflicts";
import { fetchData } from "../helpers/fetch-data";

export const getAbsences = async (): Promise<Absence[]> => {
  // fetch the list of absences
  const absences: Absence[] = await fetchData(
    `${process.env.REACT_APP_BRIGHTHR_API}/absences`
  );

  return absences;
};

export const getConflictsByAbsenceId = async (
  absenceId: number
): Promise<Conflict> => {
  // fetch conflicts by absence Id
  const conflicts: Conflict = await fetchData(
    `${process.env.REACT_APP_BRIGHTHR_API}/conflict/${absenceId}`
  );

  return conflicts;
};

export const getAbsencesWithConflicts = async (): Promise<
  AbsenceWithConflict[]
> => {
  // fetch all absences with conflicts

  const absences = await getAbsences();

  const absencesWithConflict = await Promise.all(
    absences.map(async (absence) => {
      const conflicts = await getConflictsByAbsenceId(absence.id);
      return { ...absence, conflicts: conflicts.conflicts };
    })
  );

  return absencesWithConflict;
};
