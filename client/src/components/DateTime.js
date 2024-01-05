function getDateTime(dateTime)
{
    if (!(dateTime instanceof Date)) {
        console.error('Invalid date object:', dateTime, typeof dateTime);
        return ''; // or throw an error, or handle it in another way
      }
    const year=dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
export default getDateTime;