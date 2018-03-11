
export const probDo = (func, prob = 1) => {
  if (Math.random() <= prob) {
    func();
    return true;
  }
  return false;
};

export const probDoMs = (func, delta, ms = 1000) => {
  return probDo(func, delta / ms);
};

export const getPixel = (percentage, total) => Math.round(percentage * total);
