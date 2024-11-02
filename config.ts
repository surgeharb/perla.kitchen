export const port = process.env.PORT || 7128;
export const host =
  process.env.NODE_ENV === 'production' ? `https://www.perla.kitchen` : `http://localhost:${port}`;
