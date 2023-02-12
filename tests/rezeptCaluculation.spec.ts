import * as assert from "assert";
import RezeptCalculation from "../src/modules/rezeptCalculation";

describe("レセプトの計算クラスのテスト", (): void => {
  test("初期値", (): void => {
    const rezept = new RezeptCalculation(100, 50);
    const percent = rezept.percent;
    assert.equal(percent, 50);
    const percentString = rezept.percentString;
    assert.equal(percentString, "50%");
  });
});
