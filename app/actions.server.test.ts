import { getAnagrams } from "./actions";
import { teardownDb } from "@/db/client";

describe("getAnagrams", () => {
  it("returns anagrams associated with the given word from the database", async () => {
    const res = await getAnagrams("slate");

    expect(res.length).toBe(9);

    expect(res).toMatchSnapshot();
  });

  it("returns an empty array when there are no anagrams", async () => {
    const res = await getAnagrams("fudgybadness");

    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });

  it("throws when the given string is too long", async () => {
    await expect(
      getAnagrams(
        "Averylonginputthatexceedesanythingonemightexpecttobeinthedictionary",
      ),
    ).rejects.toThrow("Given string was too long");
  });

  it("throws when something other than a string is passed", async () => {
    // @ts-ignore wrong input type
    await expect(getAnagrams({})).rejects.toThrow(
      "Given input was not a string",
    );
  });
});

afterAll(async () => {
  await teardownDb();
});
