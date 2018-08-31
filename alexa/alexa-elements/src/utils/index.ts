export const getIndex = (slots: Array<Slot>): number => {
  let idx = -1;
  for (const slot in slots) {
    if (
      Object.prototype.hasOwnProperty.call(slots, slot) &&
      slots[slot].value !== undefined
    ) {
      idx = Number.parseInt(slots[slot].value) - 1;
      break;
    }
  }
  return idx;
};
