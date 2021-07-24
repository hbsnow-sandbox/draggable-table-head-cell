import { swap } from "./swap";

describe(swap.name, () => {
  it.each`
    array                        | fromIndex | toIndex | expected
    ${["a", "b", "c", "d", "e"]} | ${0}      | ${1}    | ${["b", "a", "c", "d", "e"]}
    ${["a", "b", "c", "d", "e"]} | ${1}      | ${0}    | ${["b", "a", "c", "d", "e"]}
    ${["a", "b", "c", "d", "e"]} | ${0}      | ${4}    | ${["e", "b", "c", "d", "a"]}
    ${["a", "b", "c", "d", "e"]} | ${4}      | ${3}    | ${["a", "b", "c", "e", "d"]}
  `(
    "should swap the array specified by fromIndex and toIndex",
    ({ array, fromIndex, toIndex, expected }) => {
      const result = swap(array, fromIndex, toIndex);

      expect(result).toEqual(expected);
    }
  );

  it.each`
    array                        | fromIndex | toIndex | expected
    ${["a", "b", "c", "d", "e"]} | ${0}      | ${5}    | ${RangeError}
    ${["a", "b", "c", "d", "e"]} | ${5}      | ${0}    | ${RangeError}
    ${["a", "b", "c", "d", "e"]} | ${-1}     | ${0}    | ${RangeError}
    ${["a", "b", "c", "d", "e"]} | ${0}      | ${-1}   | ${RangeError}
  `(
    "should throw an exception if the index is out of range",
    ({ array, fromIndex, toIndex, expected }) => {
      expect(() => swap(array, fromIndex, toIndex)).toThrowError(expected);
    }
  );
});
