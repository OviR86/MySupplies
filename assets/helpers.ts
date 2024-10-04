//CAPITALISE FIRST LETTER IN EVERY WORD OF A STRING
export const capitalise = (str: string | undefined) => {
  if (str != undefined) {
    return str
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  } else return;
};

//CAPITALISE FIRST LETTER OF FIRST WORD IN STRING
export const capitaliseFirst = (str: string | undefined) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//FORMAT POCKETBASE DATE INTO DD/MM/YYYY

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Extract day and add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Extract month (getMonth() is 0-based)
  const year = date.getFullYear(); // Extract year

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};
