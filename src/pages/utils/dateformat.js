import moment from "moment";

export const formatDate = (value) => moment(value).format("DD-MM-yyyy");
