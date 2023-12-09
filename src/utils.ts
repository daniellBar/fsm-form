export const hasEmptyValues = (obj: Record<string, any>): boolean =>
  Object.keys(obj).some((key) => !obj[key]);