export const buildSortedWord = (word: string) => {
  return word
    .toLowerCase()
    .replaceAll(/[^A-z]/g, "")
    .split("")
    .sort()
    .join("");
};

export const debounce = <TArgs>(
  fn: (...args: TArgs[]) => unknown | Promise<unknown>,
  delay = 300,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<typeof fn>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const wait = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });
