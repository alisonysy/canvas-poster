export default function ({ ctx, errMsg, src, position }) {
  ctx.save();
  const { x = 0, y = 0, width = 100, height = 100 } = position || {};
  const img = document.createElement("img");
  return new Promise((resolve, reject) => {
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height);
      resolve();
    };
    img.onerror = () => {
      reject(new Error(errMsg || "生成二维码失败"));
    };
    img.src = src;
  });
}
