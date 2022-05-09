import moment from "moment";

export const timeMoment = (date) => {
  const today = moment(date);

  return today.format("HH:mm a");
};
