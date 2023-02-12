import * as assert from "assert";
import { createMessage } from "../../src/modules/createMessage";

describe("レセプトの計算クラスの単体テスト", (): void => {
  test("初期値整数", (): void => {
    const message = createMessage("853 337");
    const assertMessage =
      "① 39.79% (総数:857, CL:341)\n② 39.86% (総数:858, CL:342)\n③ 39.93% (総数:859, CL:343)";
    assert.equal(message, assertMessage);
  });
});
