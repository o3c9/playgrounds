import { Slot } from "ask-sdk-model";

export const getIndex = (
  slots: { [key: string]: Slot } | undefined
): number => {
  let idx = -1;
  if (slots) {
    for (const key in slots) {
      if (
        Object.prototype.hasOwnProperty.call(slots, key) &&
        slots[key].value !== undefined
      ) {
        idx = Number.parseInt(slots[key].value) - 1;
        break;
      }
    }
  }
  return idx;
};
