export const createShapeConfig = ({
  ctx,
  fillStyle,
  strokeStyle,
  lineWidth,
  path,
}) => {
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    path && ctx.fill(path);
    !path && ctx.fill();
  }
  if (strokeStyle) {
    ctx.lineWidth = lineWidth || 1;
    ctx.strokeStyle = strokeStyle;
    path && ctx.stroke(path);
    !path && ctx.stroke();
  }
};

/**
 * 绘制空心圆角矩形
 * @param {object} ctx canvas上下文
 * @param {object} style 圆角矩形样式，包含strokeStyle, lineWidth, path
 * @param {object} position 圆角坐标对象，包含centerX, centerY, width, height, radius
 */
export const drawRectWithRoundCorners = ({
  ctx,
  style = {},
  position = {},
  errMsg,
}) => {
  const {
    centerX = 100,
    centerY = 100,
    width = 100,
    height = 100,
    radius = 10,
  } = position;
  try {
    ctx.beginPath();
    const topStartY = radius > height ? centerY : centerY - height / 2 + radius;
    const bottomStartY =
      radius > height ? centerY : centerY + height / 2 - radius;
    const startX = radius > width ? centerX : centerX - width / 2 + radius;
    const endX = radius > width ? centerX : centerX + width / 2 - radius;
    // 绘制左上圆角
    ctx.arc(startX, topStartY, radius, (Math.PI * 3) / 2, Math.PI, true);
    ctx.moveTo(startX - radius, topStartY);
    // 绘制矩形左边
    ctx.lineTo(startX - radius, bottomStartY);
    // 绘制坐下圆角
    ctx.arc(startX, bottomStartY, radius, Math.PI, Math.PI / 2, true);
    ctx.moveTo(startX, bottomStartY + radius);
    // 绘制矩形底边
    ctx.lineTo(endX, bottomStartY + radius);
    // 绘制右下圆角
    ctx.arc(endX, bottomStartY, radius, Math.PI / 2, 0, true);
    ctx.moveTo(endX + radius, bottomStartY);
    // 绘制矩形右边
    ctx.lineTo(endX + radius, topStartY);
    // 绘制右上圆角
    ctx.arc(endX, topStartY, radius, 0, (Math.PI * 3) / 2, true);
    ctx.moveTo(endX, topStartY - radius);
    // 绘制矩形上边，并闭合
    ctx.lineTo(startX, topStartY - radius);
    ctx.closePath();
    createShapeConfig({ ctx, strokeStyle: "#000000", ...style });
  } catch (e) {
    throw new Error(errMsg || e);
  }
};
