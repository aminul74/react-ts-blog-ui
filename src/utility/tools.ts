export const dateFormatter = (date: string) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};
