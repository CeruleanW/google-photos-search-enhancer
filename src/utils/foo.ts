/**
 * @description filter the array of objects by the given property, 
 * @param  {any[]} rows
 * @param  {string} propertyName
 * @param  {} propertyValue if the value is 'all', return all the objects
 */
 export function filterByProperty(
  rows: any[],
  propertyName: string,
  propertyValue: any
): any[] {
  if (propertyValue.toUpperCase() === 'ALL') {
    return rows;
  }
  const filtered = rows.filter((row) => row[propertyName] === propertyValue);
  return filtered;
}


export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}