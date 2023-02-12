import { constants } from "../constants/const";
class RezeptCalculation {
  percent: number;
  originalPercent: number;
  percentString: string;

  constructor(private total: number, private contact: number) {
    this.percent = this.division(this.total, this.contact);
    this.originalPercent = this.percent;
    this.percentString = this.parsePercent(this.percent);
  }

  division = (denominator: number, molecule: number): number => {
    if (denominator === 0) return 0;
    const num = (molecule / denominator) * 100;
    return Number(num.toFixed(constants.SIGNIFICANT_DIGIT));
  };
  parsePercent = (percent: number): string => {
    return `${percent}%`;
  };
  checkPercentVal = (): boolean => {
    return this.percent >= constants.TARGET_PERCENT && this.percent !== 0;
  };
}

export default RezeptCalculation;
