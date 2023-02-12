import * as assert from "assert";
import RezeptCalculation from "../src/modules/rezeptCalculation";

describe("レセプトの計算クラスの単体テスト", (): void => {
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

describe("レセプトの計算クラスの結合テスト", (): void => {
  test("計算せず", (): void => {
    const rezept = new RezeptCalculation(10000, 3985);
    const { total, contact, percent } = rezept.calculation();

    assert.equal(total, 10000);
    assert.equal(contact, 3985);
    assert.equal(percent, "39.85%");
  });
  test("加算", (): void => {
    const rezept = new RezeptCalculation(853, 337);
    assert.equal(rezept.preCheckPercentValForTop(), false);
    assert.equal(rezept.preCheckPercentValForBottom(), true);
    const { total, contact, percent } = rezept.calculation();

    assert.equal(total, 857);
    assert.equal(contact, 341);
    assert.equal(percent, "39.79%");
  });
  test("減算", (): void => {
    const rezept = new RezeptCalculation(853, 500);
    assert.equal(rezept.preCheckPercentValForTop(), true);
    assert.equal(rezept.preCheckPercentValForBottom(), false);
    const { total, contact, percent } = rezept.calculation();

    assert.equal(total, 587);
    assert.equal(contact, 234);
    assert.equal(percent, "39.86%");
  });
});
