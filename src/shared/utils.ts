/* eslint-disable @typescript-eslint/no-explicit-any */

const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    await callback(element, index, array);
  }
};

export const GlobalUtils = {
  asyncForEach,
};
