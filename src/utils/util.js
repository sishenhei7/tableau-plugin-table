export function getValueByPath(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;

  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }

    current = current[path];
  }

  return result;
}

export function compare(a, b) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  }

  if (typeof a === 'number' && typeof b === 'string') {
    return -1;
  }

  if (typeof a === 'string' && typeof b === 'number') {
    return 1;
  }

  if (typeof a === 'object' && typeof b === 'string') {
    return -1;
  }

  if (typeof a === 'string' && typeof b === 'object') {
    return 1;
  }

  return 1;
}
