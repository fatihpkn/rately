function shouldRender<T>(prevProps: T, nextProps: T, keys: Array<keyof T>) {
  let isEqual = false;

  keys.forEach((key) => {
    isEqual = prevProps[key] === nextProps[key];
    if (!isEqual) {
      return isEqual;
    }
  });

  return isEqual;
}

export default shouldRender;
