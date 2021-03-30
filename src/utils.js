export const measureTxtWidth = ({ ctx, str }) => {
  if (!str || typeof str !== "string") return 0;
  return ctx.measureText(str).width;
};
