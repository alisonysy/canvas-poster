export const measureTxtWidth = ({ ctx, str, font }) => {
  if (!str) return 0;
  if (font) {
    ctx.font = font;
  }
  str = str.toString();
  return ctx.measureText(str).width;
};
