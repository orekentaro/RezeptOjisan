import RezeptCalculation from "./rezeptCalculation";
import { Calculation } from "../types/lineChatBot";

export const createMessage = (text: string) => {
  const textData = text.split(" ");
  const total = Number(textData[0]);
  const contact = Number(textData[1]);

  const rezept = new RezeptCalculation(total, contact);

  const {
    total1,
    contact1,
    percent1,
    total2,
    contact2,
    percent2,
    total3,
    contact3,
    percent3,
  } = rezept.calculation() as Calculation;
  let returnText = `① ${percent1} (総数:${total1}, CL:${contact1})\n`;
  returnText += `② ${percent2} (総数:${total2}, CL:${contact2})\n`;
  returnText += `③ ${percent3} (総数:${total3}, CL:${contact3})`;

  return returnText;
};
