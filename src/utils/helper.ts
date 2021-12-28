import axios from 'axios';

/**
 * @description ### Returns Go / Lua like responses(data, err)
 * when used with await
 *
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.all([req1, req2, req3])
 * - Example response [ [data1, data2, data3], undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.race([req1, req2, req3])
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 * @param {Promise} promise
 * @returns {Promise} [ data, undefined ]
 * @returns {Promise} [ undefined, Error ]
 */
export function handle(promise: Promise<any>) {
  return promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error]));
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function inspect(obj: object): string {
  //stringify a circular structure in a JSON-like format
  return JSON.stringify(obj, getCircularReplacer());
}

export function swrFetcher(url) {
    return axios.get(url).then((res) => res?.data);
}

/**
 * @description trim all the string type properties of an object
 * @param  {T} obj
 * @returns T
 */
export function trimObjectProperties<T>(obj: T): T {
  let result = {} as T;
  Object.assign(result, obj);
  Object.keys(obj).map((k) => {
    return (result[k] = typeof obj[k] === 'string' ? obj[k].trim() : obj[k]);
  });

  return result;
}

/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
export function filterArray(array: any[], filters) {
  if (!array) {
    return array;
  }

  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
  /**
   * The method `filterArray()` has the following signature:
   *
   * `function filterArray<TInput = any>(array: TInput[], filters: IFilters) => TInput[]`
   *
   * Where the function receives an array as the first argument, and a plain object
   * describing the fields to filter as the last argument.
   * The function returns an array of the same type as the input array.
   *
   * The signature of the filters arguments is the following:
   *
   * `interface IFilters {
   *   [key: string]: (value: any) => boolean;
   * }`
   *
   * Where the `filters` argument is an object that contains a `key: string`
   * and its value is a function with the value of the property to evaluate.
   * As the function predicate is evaluated using the `Array.prototype.every()` method,
   * then it must return a boolean value, which will determine if the item
   * must be included or not in the filtered array.
   */
}

export function makeID(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callAsyncFnWithErrorTolerance(fn, maxErrorDepth = 10) {
  let errorDepth = 0;
  let result, resultErr;
  while (errorDepth < maxErrorDepth) {
    [result, resultErr] = await handle(fn());
    // await sleep(200);
    if (result) {
      break;
    } else {
      console.error('No result');
      console.error(resultErr?.message);
      errorDepth++;
      resultErr = null;
    }
  }
  if (errorDepth >= 10) {
    throw new Error('Max error depth reached when writing firmware chunks');
  }

  return result;
}

/**
 * @description return if the array has at least one not-null-nor-empty-array element
 * @param  {any} obj
 */
export function isFilledArray(obj: any) {
  return Boolean(
    obj &&
      Array.isArray(obj) &&
      obj.flat().length > 0 &&
      obj.flat()[0] !== null &&
      obj.flat()[0] !== undefined
  );
}

export function getKBOfString(value: string): number {
  if (!value) {
    return 0;
  }
  return Math.floor(new TextEncoder().encode(value).length / 1024);
}

export function replaceEmptyStringWithNull<T>(obj: T): T {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (result[key] === '') {
      result[key] = null;
    }
  });
  return result;
}

export function createAxiosTokenConfig(
  token: string | undefined,
): object | undefined {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return;
}