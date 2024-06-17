export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  const dateFormatter = new Intl.DateTimeFormat("en-GB");
  return dateFormatter.format(date);
};

export const calculateEndDate = (startDate: string, days: number): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days - 1);
  return endDate;
};
