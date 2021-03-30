import { createShapeConfig } from "./drawShapes";

export default function ({ ctx, style, position, src, errMsg }) {
  const { radius, centerX, centerY } = position;
  const { lineWidth = 1 } = style;
  // 绘制空心圆圈
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + lineWidth, 0, 2 * Math.PI, false);
  createShapeConfig({ ctx, ...style });
  ctx.closePath();
  // 绘制内圈的clip路径
  ctx.beginPath();
  ctx.save();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.clip();
  ctx.closePath();
  // 绘制头像图片到内圈剪裁区域中
  const img = document.createElement("img");
  return new Promise((resolve, reject) => {
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      ctx.drawImage(
        img,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );
      ctx.restore();
      resolve();
    };
    img.onerror = () => {
      reject(new Error(errMsg || "生成头像失败"));
    };
    img.src = src;
  });
}
