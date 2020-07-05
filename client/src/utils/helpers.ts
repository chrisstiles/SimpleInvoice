import { assign, pick, keys } from 'lodash';

// Move element to another position in an array
export function moveElement<T>(
  array: T[],
  from: number,
  to: number
): T[] {
  array = array.slice();
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
  return array;
}

export function assignExisting(a: object, b: object) {
  return assign(a, pick(b, keys(a)));
}
