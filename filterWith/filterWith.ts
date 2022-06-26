export const filterWith = <T>(arr: Array<T>, phrase: String | Number) => {
  if (typeof phrase === 'string') {
    if (phrase.length <= 2) return [];
  }
  return arr.filter(element => {
    const values = Object.values(element);
    const result = findElement(values, phrase);
    if (result.length > 0) return true;
    return false;
  })
}

function findElement<T>(arr: Array<T>, phrase: String | Number) : Array<T>{
  const regex = new RegExp(phrase.toString().toLowerCase());
  return arr.filter(element => {
    if (typeof element === 'object') {
      if (Array.isArray(element)) {
        return findElement(element, phrase).length;
      }
      return findElement(Object.values(element), phrase).length;
    }
    if (typeof element === 'string') return regex.test(element.toLowerCase());
    if (typeof element === 'number') return regex.test(element.toString().toLowerCase());
    return false;
  })
}