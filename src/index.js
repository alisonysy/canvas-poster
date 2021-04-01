export { default as drawBackground } from "./drawBackground";
export { default as drawQrcode } from "./drawQrcode";
export { drawRectWithRoundCorners, createShapeConfig } from "./drawShapes";
export {
  createTextConfig,
  drawSingleLineText,
  drawMultipleLineText,
  drawTwoStyledItemsInALine,
} from "./drawText";
export { measureTxtWidth } from "./utils";
export { default as drawAvatar } from "./drawAvatar";

const initCanvas = ({ canvasId, width, height }) => {
  const dom = document.getElementById(canvasId);
  if (dom) {
    dom.parentNode.removeChild(dom);
  }
  const canvasEl = document.createElement("canvas");
  if (!canvasId) throw Error("请提供canvas元素ID");
  canvasEl.id = canvasId;
  if (!width || !height) throw Error("请提供画布的高度和宽度");
  canvasEl.width = width;
  canvasEl.height = height;
  canvasEl.style.display = "none";
  document.body.appendChild(canvasEl);
  return { context: canvasEl.getContext("2d"), dom: canvasEl };
};

const getPosterBase64 = (canvas) => {
  return canvas && canvas.toDataURL && canvas.toDataURL();
};

export { initCanvas, getPosterBase64 };
