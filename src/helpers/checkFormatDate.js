import moment from "moment";

export const formatDateToISO = (dateString) => {
    if (!dateString) return '';
    const parsedDate = moment(dateString, ["DD/MM/YYYY", "DD.MM.YYYY", "MM/DD/YYYY", "YYYY-MM-DD"], true);
    return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : '';
}