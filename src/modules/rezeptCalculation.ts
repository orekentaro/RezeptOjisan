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
  parsePercent = (percent?: number): string => {
    return percent ? `${percent}%` : `${this.percent}%`;
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
      return {
        total1: this.total - 2,
        contact1: this.contact - 2,
        percent1: this.parsePercent(
          this.division(this.total - 2, this.contact - 2)
        ),
        total2: this.total - 1,
        contact2: this.contact - 1,
        percent2: this.parsePercent(
          this.division(this.total - 1, this.contact - 1)
        ),
        total3: this.total,
        contact3: this.contact,
        percent3: this.parsePercent(),
      };
    }
    while (this.preCheckPercentValForBottom()) {
      this.total += 1;
      this.contact += 1;
      this.percent = this.division(this.total, this.contact);
    }
    return {
      total1: this.total,
      contact1: this.contact,
      percent1: this.parsePercent(),
      total2: this.total + 1,
      contact2: this.contact + 1,
      percent2: this.parsePercent(
        this.division(this.total + 1, this.contact + 1)
      ),
      total3: this.total + 2,
      contact3: this.contact + 2,
      percent3: this.parsePercent(
        this.division(this.total + 2, this.contact + 2)
      ),
    };
  };
}

export default RezeptCalculation;
