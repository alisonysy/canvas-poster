export default function ({ ctx, width, height, errMsg, src }) {
  const img = document.createElement("img");
  return new Promise((resolve, reject) => {
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      resolve();
    };
    img.onerror = () => {
      reject(new Error(errMsg || "生成海报背景失败"));
    };
    img.src = src;
  });
}
