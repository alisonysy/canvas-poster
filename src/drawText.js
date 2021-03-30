import { measureTxtWidth } from "./utils";
export const createTextConfig = ({
  ctx,
  color,
  textAlign,
  fontSize,
  fontFamily,
  baseline,
}) => {
  ctx.save();
  ctx.fillStyle = color || "#000";
  ctx.textAlign = textAlign || "left";
  ctx.textBaseline = baseline || "alphabetic";
  ctx.font = (fontSize || "14px") + " " + (fontFamily + "HYZhengYuan-55W");
};

// 绘制一行文字
export const drawSingleLineText = ({ ctx, text, style, position }) => {
  createTextConfig({ ...style, ctx });
  const { x, y, maxLength } = position;
  if (maxLength) {
    ctx.fillText(text, x, y, maxLength);
  } else {
    ctx.fillText(text, x, y);
  }
  ctx.restore();
};

// 绘制多行文字（根据最大长度换行）
export const drawMultipleLineText = ({
  ctx,
  text,
  style,
  position,
  separator = "",
  lineSpace = 0,
}) => {
  const { x, y, maxLength } = position;
  const characters = text.split(separator || "");
  const lines = [];
  let temp = "";
  let lastY = y;
  createTextConfig({ ...style, ctx });
  // 文字分行
  for (let n = 0; n < characters.length; n++) {
    if (measureTxtWidth({ ctx, temp }) > maxLength) {
      lines.push(temp);
      temp = "";
    }
    temp += characters[n];
  }
  // 推入最后一行
  lines.push(temp);
  // 绘制文字
  for (let i = 0; i < lines.length; i++) {
    lineSpace = lineSpace ? lastY + lineSpace : lastY;
    ctx.fillText(lines[i], x, lineSpace);
  }
  ctx.restore();
};

/**
 * 绘制一行文字，包含前后两种不同的文字样式
 * @param {object} ctx canvas上下文
 * @param {object} left 左边文字对象，包含style和text，无需position
 * @param {object} right 右边文字对象，包含style和text，无需position
 * @param {number} gap 左边和右边文字中间间距
 * @param {object} position 整行文字的坐标数据，x应为整行文字的中心横坐标
 */
export const drawTwoStyledItemsInALine = ({
  ctx,
  left,
  right,
  gap,
  position,
}) => {
  const { style: leftStyle, text: leftText } = left;
  const { style: rightStyle, text: rightText } = right;
  const { centerX, y } = position;
  const totalLength =
    measureTxtWidth(leftText) + measureTxtWidth(rightText) + Number(gap);
  // 绘制左边文字
  const leftStartX = centerX - totalLength / 2;
  drawSingleLineText({
    ctx,
    text: leftText,
    style: { ...leftStyle, textAlign: "left" },
    position: {
      x: leftStartX,
      y,
    },
  });
  ctx.restore();
  // 绘制右边文字
  const rightStartX = leftStartX + measureTxtWidth(leftText) + Number(gap);
  drawSingleLineText({
    ctx,
    text: rightText,
    style: {
      ...rightStyle,
      textAlign: "left",
    },
    position: {
      x: rightStartX,
      y,
    },
  });
};