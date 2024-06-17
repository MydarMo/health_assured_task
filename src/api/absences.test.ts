import { Absence, AbsenceType } from "../interfaces/absences";
import { Conflict } from "../interfaces/conflicts";
import {
  getAbsences,
  getAbsencesWithConflicts,
  getConflictsByAbsenceId,
} from "./absences";
import { fetchData } from "../helpers/fetch-data";

jest.mock("../helpers/fetch-data");
// Mock the global fetch function
global.fetch = jest.fn();

describe("absenceServices", () => {
  const absences: Absence[] = [
    {
      id: 0,
      startDate: "2022-05-28T04:39:06.470Z",
      days: 9,
      absenceType: AbsenceType.SICKNESS,
      employee: {
        firstName: "Rahaf",
        lastName: "Deckard",
        id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
      },
      approved: true,
    },
  ];
  const conflicts: Conflict = { conflicts: true };

  describe("getAbsences Test", () => {
    const safelyCallApi = async () => {
      try {
        return await getAbsences();
      } catch (e) {
        return null;
      }
    };

    it("Should ignore failed API calls during traversing", () => {
      (fetchData as jest.Mock).mockResolvedValueOnce(absences);
      (fetchData as jest.Mock).mockRejectedValueOnce("An error occurred");

      expect(safelyCallApi()).resolves.toEqual(absences);
    });

    // it("should return the list of absences", async () => {
    //   global.fetch = jest.fn(() =>
    //     Promise.resolve({
    //       ok: true,
    //       status: 200,
    //       json: () => Promise.resolve(absencesMockResponse),
    //     })
    //   ) as jest.Mock;

    //   const absencesData = await getAbsences();

    //   expect(absencesData).toEqual(absencesMockResponse);
    // });
  });

  describe("getConflictById Test", () => {
    const safelyCallApi = async () => {
      try {
        return await getConflictsByAbsenceId(0);
      } catch (e) {
        return null;
      }
    };

    it("Should ignore failed API calls during traversing", () => {
      (fetchData as jest.Mock).mockResolvedValueOnce(conflicts);
      (fetchData as jest.Mock).mockRejectedValueOnce("An error occurred");

      expect(safelyCallApi()).resolves.toEqual(conflicts);
    });
  });

  describe("getAbsencesWithConflicts Tests", () => {
    const safelyCallApi = async () => {
      try {
        return await getAbsencesWithConflicts();
      } catch (e) {
        return null;
      }
    };

    it("Should traverse and make api calls to each conflict for every absence Id", async () => {
      expect.assertions(2);
      (fetchData as jest.Mock).mockResolvedValueOnce(absences);
      (fetchData as jest.Mock).mockResolvedValueOnce(conflicts);
      await safelyCallApi();

      expect(fetchData).toBeCalledWith(
        `${process.env.REACT_APP_BRIGHTHR_API}/absences`
      );
      expect(fetchData).toBeCalledWith(
        `${process.env.REACT_APP_BRIGHTHR_API}/conflict/0`
      );
    });

    it("Should ignore failed API calls during traversing", () => {
      (fetchData as jest.Mock).mockResolvedValueOnce(absences);
      (fetchData as jest.Mock).mockResolvedValueOnce(conflicts);
      (fetchData as jest.Mock).mockRejectedValueOnce("An error occurred");

      expect(safelyCallApi()).resolves.toEqual([
        { ...absences[0], ...conflicts },
      ]);
    });
  });
});
