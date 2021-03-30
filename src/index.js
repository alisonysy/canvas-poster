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
  canvasEl.id = canvasId;
  canvasEl.width = width;
  canvasEl.height = height;
  canvasEl.style.display = "none";
  document.body.appendChild(canvasEl);
  return canvasEl.getContext("2d");
};

const getPosterBase64 = (canvas) => {
  return canavas && canvas.toDataURL && canvas.toDataURL();
};

export { initCanvas, getPosterBase64 };
