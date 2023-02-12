import { constants } from "../constants/const";
class RezeptCalculation {
  percent: number;
  percentString: string;
  originalPercent: number;
  originalTotal: number;
  originalContact: number;

  constructor(private total: number, private contact: number) {
    this.percent = this.division(this.total, this.contact);
    this.percentString = this.parsePercent();
    this.originalPercent = this.percent;
    this.originalTotal = this.total;
    this.originalContact = this.contact;
  }
  /**
   * method
   * @param denominator 分母
   * @param modules 分子
   */
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
  calculation = () => {
    if (this.checkPercentValForTop()) {
      while (this.preCheckPercentValForTop()) {
        this.total -= 1;
        this.contact -= 1;
        this.percent = this.division(this.total, this.contact);
      }
    } else {
      while (this.preCheckPercentValForBottom()) {
        this.total += 1;
        this.contact += 1;
        this.percent = this.division(this.total, this.contact);
      }
    }
    return {
      total: this.total,
      contact: this.contact,
      percent: this.parsePercent(),
    };
  };
}

export default RezeptCalculation;
