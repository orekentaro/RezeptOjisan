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

  test("減算パーセント確認オーバー", (): void => {
    const rezept = new RezeptCalculation(10000, 3986);
    expect(rezept.checkPercentValForTop()).toBe(true);
  });
  test("減算パーセント確認イコール", (): void => {
    const rezept = new RezeptCalculation(10000, 3985);
    expect(rezept.checkPercentValForTop()).toBe(true);
  });
  test("減算パーセント確認アンダー", (): void => {
    const rezept = new RezeptCalculation(10000, 3984);
    expect(rezept.checkPercentValForTop()).toBe(false);
  });

  test("加算パーセント確認オーバー", (): void => {
    const rezept = new RezeptCalculation(10000, 3986);
    expect(rezept.checkPercentValForBottom()).toBe(false);
  });
  test("加算パーセント確認イコール", (): void => {
    const rezept = new RezeptCalculation(10000, 3985);
    expect(rezept.checkPercentValForBottom()).toBe(true);
  });
  test("加算パーセント確認アンダー", (): void => {
    const rezept = new RezeptCalculation(10000, 3984);
    expect(rezept.checkPercentValForBottom()).toBe(true);
  });

  test("pre減算パーセント確認オーバー", (): void => {
    const rezept = new RezeptCalculation(10001, 3987);
    expect(rezept.preCheckPercentValForTop()).toBe(true);
  });
  test("pre減算パーセント確認イコール", (): void => {
    const rezept = new RezeptCalculation(10001, 3986);
    expect(rezept.preCheckPercentValForTop()).toBe(true);
  });
  test("pre減算パーセント確認アンダー", (): void => {
    const rezept = new RezeptCalculation(10001, 3985);
    expect(rezept.preCheckPercentValForTop()).toBe(false);
  });

  test("pre加算パーセント確認オーバー", (): void => {
    const rezept = new RezeptCalculation(9999, 3985);
    expect(rezept.preCheckPercentValForBottom()).toBe(false);
  });
  test("pre加算パーセント確認イコール", (): void => {
    const rezept = new RezeptCalculation(9999, 3984);
    expect(rezept.preCheckPercentValForBottom()).toBe(true);
  });
  test("pre加算パーセント確認アンダー", (): void => {
    const rezept = new RezeptCalculation(9999, 3983);
    expect(rezept.preCheckPercentValForBottom()).toBe(true);
  });
});
