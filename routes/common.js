
module.exports = {
  getCurrentIndianDate() {
		const d = new Date();
		// convert to msec
		// subtract local time zone offset
		// get UTC time in msec
		const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

		// create new Date object for different city
		// using supplied offset
		const nd = new Date(utc + (3600000*'+5.5'));
		return nd;
	}
}