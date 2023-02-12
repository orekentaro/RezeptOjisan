import { constants } from "../constants/const";
class RezeptCalculation {
  percent: number;
  originalPercent: number;
  percentString: string;

  constructor(private total: number, private contact: number) {
    this.percent = this.division(this.total, this.contact);
    this.originalPercent = this.percent;
    this.percentString = this.parsePercent();
  }

  division = (denominator: number, molecule: number): number => {
    if (denominator === 0) return 0;
    const num = (molecule / denominator) * 100;
    return Number(num.toFixed(constants.SIGNIFICANT_DIGIT));
  };
  parsePercent = (): string => {
    return `${this.percent}%`;
  };
  checkPercentValForTop = (): boolean => {
    return this.percent >= constants.TARGET_PERCENT;
  };
  checkPercentValForBottom = (): boolean => {
    return this.percent <= constants.TARGET_PERCENT;
  };
  preCheckPercentValForTop = (): boolean => {
    return (
      this.division(this.total - 1, this.contact - 1) >=
      constants.TARGET_PERCENT
    );
  };
  preCheckPercentValForBottom = (): boolean => {
    return (
      this.division(this.total + 1, this.contact + 1) <=
      constants.TARGET_PERCENT
    );
  };
}

export default RezeptCalculation;
