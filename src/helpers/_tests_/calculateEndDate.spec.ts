import {calculateEndDate} from "../format-date";

describe("calculateEndDate", () => {
  it("calculates the end date correctly for a range within the same month", () => {
    const startDate = "2020-01-01";
    const days = 10;
    const expectedEndDate = new Date("2020-01-10");
    expect(calculateEndDate(startDate, days).toISOString()).toBe(
      expectedEndDate.toISOString()
    );
  });

  it("calculates the end date correctly when the range spans to the next month", () => {
    const startDate = "2020-01-25";
    const days = 10;
    const expectedEndDate = new Date("2020-02-03");
    expect(calculateEndDate(startDate, days).toISOString()).toBe(
      expectedEndDate.toISOString()
    );
  });

  it("accounts for leap years", () => {
    const startDate = "2020-02-28";
    const days = 2;
    const expectedEndDate = new Date("2020-02-29");
    expect(calculateEndDate(startDate, days).toISOString()).toBe(
      expectedEndDate.toISOString()
    );
  });

  it("calculates the end date correctly for a single day", () => {
    const startDate = "2020-03-01";
    const days = 1;
    const expectedEndDate = new Date("2020-03-01");
    expect(calculateEndDate(startDate, days).toISOString()).toBe(
      expectedEndDate.toISOString()
    );
  });
});
