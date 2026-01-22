import { buildSortedWord, debounce, wait } from ".";

describe("buildSortedWord", () => {
  it("returns an empty string when given an empty string", () => {
    expect(buildSortedWord("")).toBe("");
  });

  it("returns with given string re-ordered alphabetically", () => {
    expect(buildSortedWord("kjnsadcyguyybe")).toBe("abcdegjknsuyyy");
  });

  it("returns with given string any non alphabetical characters removed", () => {
    expect(buildSortedWord("kj|ns adc-yg=u:yy;;b\e")).toBe("abcdegjknsuyyy");
  });

  it("returns with given string any capital letters made lower case", () => {
    expect(buildSortedWord("kj|Ns AdC-yg=u:yY;;b\e")).toBe("abcdegjknsuyyy");
  });
});

describe("debounce", () => {
  it("runs the given function after the specified delay", async () => {
    const mockFunc = jest.fn();

    const debouncedMockFunc = debounce(mockFunc, 1000);

    debouncedMockFunc();
    expect(mockFunc).not.toHaveBeenCalled();
    await wait(1000);
    expect(mockFunc).toHaveBeenCalled();
  });

  it("Only runs the function once after repeated calls during the specified delay", async () => {
    const mockFunc = jest.fn();

    const debouncedMockFunc = debounce(mockFunc, 1000);
    debouncedMockFunc();
    await wait(100);
    debouncedMockFunc();
    await wait(100);
    debouncedMockFunc();
    await wait(100);
    debouncedMockFunc();
    await wait(100);
    expect(mockFunc).not.toHaveBeenCalled();

    await wait(1000);

    expect(mockFunc).toHaveBeenCalled();

    await wait(1000);

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
