class RezeptCalculation {
  percent: number;
  percentString: string;
  constructor(private total: number, private contact: number) {
    this.percent = this.division(this.total, this.contact);
    this.percentString = this.parsePercent(this.percent);
  }

  division = (denominator: number, molecule: number): number => {
    try {
      return (molecule / denominator) * 100;
    } catch (err) {
      return 0.0;
    }
  };
  parsePercent = (percent: number): string => {
    const returnVal = String(percent);
    console.log(`${returnVal}%`);
    return `${returnVal}%`;
  };
}

export default RezeptCalculation;
