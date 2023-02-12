import * as assert from "assert";
import RezeptCalculation from "../src/modules/rezeptCalculation";

describe("レセプトの計算クラスのテスト", (): void => {
  test("初期値整数", (): void => {
    const rezept = new RezeptCalculation(100, 50);
    const percent = rezept.percent;
    assert.equal(percent, 50);
    const percentString = rezept.percentString;
    assert.equal(percentString, "50%");
  });
  test("初期値少数", (): void => {
    const rezept = new RezeptCalculation(120, 50);
    const percent = rezept.percent;
    assert.equal(percent, 41.67);
    const percentString = rezept.percentString;
    assert.equal(percentString, "41.67%");
  });
  test("分母0", (): void => {
    const rezept = new RezeptCalculation(0, 50);
    const percent = rezept.percent;
    assert.equal(percent, 0);
    const percentString = rezept.percentString;
    assert.equal(percentString, "0%");
  });

  test("パーセント確認オーバー", (): void => {
    const rezept = new RezeptCalculation(10000, 3986);
    expect(rezept.checkPercentVal()).toBe(true);
  });
  test("パーセント確認イコール", (): void => {
    const rezept = new RezeptCalculation(10000, 3985);
    expect(rezept.checkPercentVal()).toBe(true);
  });
  test("パーセント確認アンダー", (): void => {
    const rezept = new RezeptCalculation(10000, 3984);
    expect(rezept.checkPercentVal()).toBe(false);
  });
});
