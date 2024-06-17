import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAbsencesWithConflicts } from "../../hooks/use-absence-with-conflict";
import { AbsenceType } from "../../interfaces/absences";
import { AbsenceTable } from "../absence-table";

jest.mock("../../hooks/use-absence-with-conflict");

const mockAbsences = [
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
    conflicts: true,
  },
  {
    id: 0,
    startDate: "2022-04-28T04:39:06.470Z",
    days: 9,
    absenceType: AbsenceType.MEDICAL,
    employee: {
      firstName: "Micheal",
      lastName: "Richard",
      id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
    },
    approved: false,
    conflicts: false,
  },
];

describe("<AbsenceTable /> Tests", () => {
  it("Should show loading state if it not falsy", () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      absences: [],
      loading: true,
      error: "An error occurred",
    });
    const { queryByTestId } = render(<AbsenceTable />);

    expect(queryByTestId("loading")).not.toBeNull();
    expect(queryByTestId("error")).toBeNull();
    expect(queryByTestId("results")).toBeNull();
  });

  it("Should show error if it is not falsy and loading is finished", () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      absences: [],
      loading: false,
      error: "An error occurred",
    });
    const { queryByTestId } = render(<AbsenceTable />);

    expect(queryByTestId("loading")).toBeNull();
    expect(queryByTestId("error")).not.toBeNull();
    expect(queryByTestId("results")).toBeNull();
  });

  it("Should show results if loading successfully finished", () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      absences: mockAbsences,
      loading: false,
      error: false,
    });
    const { queryByTestId } = render(<AbsenceTable />);

    expect(queryByTestId("loading")).toBeNull();
    expect(queryByTestId("error")).toBeNull();
    expect(queryByTestId("results")).not.toBeNull();
  });

  it("should show the table of absences", () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      absences: mockAbsences,
      loading: false,
      error: false,
    });
    render(<AbsenceTable />);
    // Find the h1 element
    const headingElement = screen.getByRole("heading", { level: 1 });
    const caption = screen.getByText(
      "All Absences with employee information, approval status, dates, and type"
    );

    // Assert that the h1 element contains the expected text
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Employee Absences");
    expect(caption).toBeInTheDocument();
  });
});

describe("Table Component", () => {
  beforeEach(() => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      absences: mockAbsences,
      loading: false,
      error: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table with correct initial data", () => {
    render(<AbsenceTable />);

    //test table headers
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Employee Name")).toBeInTheDocument();
    expect(screen.getByText("Approval Status")).toBeInTheDocument();
    expect(screen.getByText("Absence Type")).toBeInTheDocument();

    //test first table row with correct display data
    expect(screen.getByText("28/05/2022")).toBeInTheDocument();
    expect(screen.getByText("05/06/2022")).toBeInTheDocument();
    expect(screen.getByText("Rahaf Deckard")).toBeInTheDocument();
    expect(screen.getByText("APPROVED")).toBeInTheDocument();
    expect(screen.getByText("SICKNESS")).toBeInTheDocument();

    //test second table row with correct display data
    expect(screen.getByText("28/04/2022")).toBeInTheDocument();
    expect(screen.getByText("06/05/2022")).toBeInTheDocument();
    expect(screen.getByText("Micheal Richard")).toBeInTheDocument();
    expect(screen.getByText("NOT APPROVED")).toBeInTheDocument();
    expect(screen.getByText("MEDICAL")).toBeInTheDocument();
  });

  it("sorts table data by Start Date", () => {
    render(<AbsenceTable />);

    fireEvent.click(screen.getByText("Start Date"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("28/05/2022");
    expect(rows[2]).toHaveTextContent("28/04/2022");
  });

  it("sorts table data by End Date", () => {
    render(<AbsenceTable />);

    fireEvent.click(screen.getByText("End Date"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("06/05/2022");
    expect(rows[2]).toHaveTextContent("05/06/2022");
  });

  it("sorts table data by Employee Name", () => {
    render(<AbsenceTable />);

    fireEvent.click(screen.getByText("Employee Name"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Rahaf Deckard");
    expect(rows[2]).toHaveTextContent("Micheal Richard");
  });

  it("sorts table data by Absence Type", () => {
    render(<AbsenceTable />);

    fireEvent.click(screen.getByText("Absence Type"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("SICKNESS");
    expect(rows[2]).toHaveTextContent("MEDICAL");
  });

  it("shows visual indication of conflicts if conflicts is true", () => {
    render(<AbsenceTable />);

    //check that only absences with conflicts have chips
    const chips = screen.getAllByTestId("chip");
    expect(chips.length).toBe(1);
    expect(chips[0]).toHaveTextContent("Conflicts");
  });
});
