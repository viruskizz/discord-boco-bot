module.exports = {
  covertArrayArgsToObjectArgs(arrayArgs) {
    const obj = {};
    arrayArgs.forEach(s => {
      const el = s.substring(2).split('=');
      Object.assign(obj, {
        [el[0]]: el.slice(1).join('='),
      });
    });
    return obj;
  }
};
