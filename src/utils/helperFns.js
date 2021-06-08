export const sortData = data => {
  const result = data.sort((a, b) => {
    const _a =
      a.fields.completed !== undefined && a.fields.completed !== false && true;
    const _b =
      b.fields.completed !== undefined && a.fields.completed !== false && true;
    return _a === _b ? 0 : _a > _b ? 1 : -1;
  });
  return result;
};
