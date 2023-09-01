/* eslint-disable @typescript-eslint/no-explicit-any */

export const excludeSelect = (obj: Record<string, unknown>, keys: any[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};
