import { describe, expect, it } from "vitest";
import { copy, demoReply } from "../apps/web/app/demo";

describe("Copilot demo", () => {
  it("answers a Vietnamese schedule suggestion using demo classes", () => {
    expect(demoReply(copy.vi.topics.schedule, "vi")).toContain("Cấu trúc dữ liệu");
  });

  it("reports completed and remaining credits", () => {
    expect(demoReply(`  ${copy.en.topics.credits.toUpperCase()} `, "en"))
      .toBe("54/120 · 66 credits remaining");
  });

  it("explains demo limits for other questions", () => {
    expect(demoReply("Change my grades", "en")).toBe(copy.en.fallback);
  });
});
