import moment from "moment";

export const formatTimestamp = (createdAt) => {
  return moment(createdAt).format('h:mm A');
}