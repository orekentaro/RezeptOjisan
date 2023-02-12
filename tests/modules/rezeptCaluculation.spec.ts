import * as assert from "assert";
import RezeptCalculation from "../../src/modules/rezeptCalculation";

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
    } = rezept.calculation();

    assert.equal(total1, 9998);
    assert.equal(contact1, 3983);
    assert.equal(percent1, "39.84%");

    assert.equal(total2, 9999);
    assert.equal(contact2, 3984);
    assert.equal(percent2, "39.84%");

    assert.equal(total3, 10000);
    assert.equal(contact3, 3985);
    assert.equal(percent3, "39.85%");
  });
  test("加算", (): void => {
    const rezept = new RezeptCalculation(853, 337);
    assert.equal(rezept.preCheckPercentValForTop(), false);
    assert.equal(rezept.preCheckPercentValForBottom(), true);
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
    } = rezept.calculation();

    assert.equal(total1, 857);
    assert.equal(contact1, 341);
    assert.equal(percent1, "39.79%");

    assert.equal(total2, 858);
    assert.equal(contact2, 342);
    assert.equal(percent2, "39.86%");

    assert.equal(total3, 859);
    assert.equal(contact3, 343);
    assert.equal(percent3, "39.93%");
  });
  test("減算", (): void => {
    const rezept = new RezeptCalculation(853, 500);
    assert.equal(rezept.preCheckPercentValForTop(), true);
    assert.equal(rezept.preCheckPercentValForBottom(), false);
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
    } = rezept.calculation();

    assert.equal(total1, 585);
    assert.equal(contact1, 232);
    assert.equal(percent1, "39.66%");

    assert.equal(total2, 586);
    assert.equal(contact2, 233);
    assert.equal(percent2, "39.76%");

    assert.equal(total3, 587);
    assert.equal(contact3, 234);
    assert.equal(percent3, "39.86%");
  });
});
