import moment from 'moment';

export const formatUTC = (date: Date) => {
	if (date === null || date === undefined) {
		return " - ";
	}

	const formatter = moment.utc(date);
	return formatter.format("DD/MM/YYYY");
}

export const formatISO = (date: Date) => {
	const formatter = moment(date);
	return formatter.format("YYYY-MM-DD");
}

export const formatDateString = (datetime: String) => {
	const [date, time] = datetime.split(" ");
	const [year, month, day] = date.split("-");
	return `${day}/${month}/${year} ${time}`;
}

export const formatDatetime = (date: Date) => {
	const dateFormated = formatISO(date);
	const time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
	return `${dateFormated} ${time}`;
}

export const formatInputDate =(inputDate: string): string =>{
    const parts = inputDate;
    const formattedDate = `${parts[0]}-${String(parts[1]).padStart(2, '0')}-${String(parts[2]).padStart(2, '0')}`;
   
    return formattedDate;
    
  }
