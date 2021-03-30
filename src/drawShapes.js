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
 * 绘制圆角矩形
 * @param {object} ctx canvas上下文
 * @param {object} style 圆角矩形样式，包含fillStyle, strokeStyle, lineWidth, path
 * @param {object} position 圆角坐标对象，包含centerX, centerY, width, height, radius
 */
export const drawRectWithRoundCorners = ({ ctx, style, position, errMsg }) => {
  const { centerX, centerY, width, height, radius = 0 } = position;
  try {
    ctx.beginPath();
    const topStartY = centerY - height / 2 + radius;
    const bottomStartY = centerY + height / 2 - radius;
    const startX = centerX - width / 2 + radius;
    const endX = centerX + width / 2 - radius;
    ctx.arc(startX, topStartY, radius, (Math.PI * 3) / 2, Math.PI, true);
    ctx.lineTo(centerX - width / 2, bottomStartY);
    ctx.arc(startX, bottomStartY, radius, Math.PI, Math.PI / 2, true);
    ctx.lineTo(endX, bottomStartY);
    ctx.arc(endX, bottomStartY, radius, Math.PI, 0, true);
    ctx.lineTo(centerX + width / 2, topStartY);
    ctx.arc(endX, topStartY, radius, 0, (Math.PI * 3) / 2, true);
    ctx.closePath();
    // #todo: closePath之后调用lineWidth等能否起效
    createShapeConfig({ ctx, ...style });
  } catch (e) {
    throw new Error(errMsg || e);
  }
};
