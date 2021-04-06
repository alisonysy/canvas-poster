# 使用 canvas 制作海报

## 使用指南

引入`index.js`导出的方法：

```js
import {
  drawBackground, // 绘制海报背景
  drawQrcode, // 绘制二维码
  drawRectWithRoundCorners, // 绘制空心圆角矩形
  drawRoundRect, // 绘制空心/实心圆角矩形
  createShareConfig, // 设置图形样式，如fillStyle, strokeStyle, lineWidth
  createTextConfig, // 设置文字样式，如font
  drawSingleLineText, // 绘制单行文字
  drawMultipleLineText, // 绘制多行换行文字
  drawTwoStyledItemsInALine, // 绘制单行2个不同样式的文字
  measureTxtWidth, // 返回当前渲染的文字宽度
  drawAvatar, // 绘制用户头像
  initCanvas, // 初始化canvas
  getPosterBase64, // canvas转换为图片
}
```

### drawBackground 绘制海报背景

接收参数：

```
ctx (required): canvas上下文
width (required): 在canvas上绘制的宽度
height (required): 在canvas上绘制的高度
src (required): 海报背景图
errMsg (optional): 若报错，显示的文字，默认是：生成海报背景失败
```

### drawQrcode 绘制二维码

接收参数：

```
ctx (required): canvas上下文
src (required): 二维码图
position (optional): 绘制二维码坐标和大小等
  x: 二维码左上角横坐标，默认为0
  y: 二维码左上角纵坐标，默认为0
  width: 二维码宽度，默认为100
  height: 二维码高度，默认为100
errMsg (optional): 若报错，显示的文字，默认是：生成二维码失败
```

### drawRectWithRoundCorners 绘制空心圆角矩形

通常用于绘制圆角的分割线
接收参数：

```
ctx (required): canvas上下文
style (optional): 圆角矩形样式
  strokeStyle: 矩形边框颜色，默认为#000000
  lineWidth: 矩形边框粗细，默认为1
position (optional): 矩形的坐标和大小等
  centerX: 矩形中心横坐标，默认100
  centerY: 矩形中心纵坐标，默认100
  width: 矩形宽度，默认100
  height: 矩形高度，默认100
  radius: 矩形圆角的半径，默认10
errMsg (optional): 若报错，显示的文字，默认是绘制矩形时候可能出现的浏览器报错
```

### drawRoundRect 绘制空心/实心圆角矩形

通常用于绘制圆角的分割线，与`drawRectWithRoundCorners`的区别在于，`drawRoundRect`使用`arcTo`进行绘制，若`radius > width`，`drawRoundRect`绘制出来的是类似四角星的形状；而`drawRectWithRoundCorners`使用`arc`进行绘制，若`radius > width`，它绘制出来的仍然是圆角矩形。
接收参数：

```
ctx (required): canvas上下文
style (optional): 圆角矩形样式
  fillStyle: 矩形填充颜色，不传则透明
  strokeStyle: 矩形边框颜色，不传则投屏
  lineWidth: 矩形边框粗细，若有strokeStyle，默认为1
position (optional): 矩形的坐标和大小等
  centerX: 矩形中心横坐标，默认100
  centerY: 矩形中心纵坐标，默认100
  width: 矩形宽度，默认100
  height: 矩形高度，默认100
  radius: 矩形圆角的半径，默认10
errMsg (optional): 若报错，显示的文字，默认是绘制矩形时候可能出现的浏览器报错
```

### createShapeConfig 设置形状样式

支持设置形状底色，边框颜色和边框粗细
接收参数：

```
ctx (required): canvas上下文
fillStyle (optional): 当前绘制的形状的底色，不传则没有底色
strokeStyle (optional): 当前绘制的形状边框颜色，不传则没有边框
lineWidth (optional): 当前绘制的形状边框粗细，若设置了边框颜色，不传lineWidth则默认为1
path (optional): 可传入需要设置样式的path
```

### createTextConfig 设置文字样式

支持设置文字颜色`fillStyle`、对齐属性（水平）`textAlign`、绘制基准（垂直）`textBaseline`、大小和字体`font`。
接收参数：

```
ctx (required): canvas上下文
color (optional): 文字颜色，默认#000000
textAlign (optional): 文字水平对齐，默认左边对齐，传入值参考canvas的[textAlign属性](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign)
fontSize (optional): 文字大小，默认14px
fontFamily (optional): 字体，默认HYZhengYuan-55W
baseline (optional): 文字垂直基准，默认alphabetic，传入值参考canvas的[textBaseline属性](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
```

### drawSingleLineText 绘制单行文字

可用于绘制昵称
接收参数：

```
ctx (required): canvas上下文
text (optional): 文字，不传则为空
style (optional): 文字样式，不传则为`createTextConfig`默认样式
position (optional): 文字坐标，大小
  x: 绘制开始横坐标，默认为0
  y: 绘制开始纵坐标，默认为0
  maxLength: 最大宽度，不传则不限定最大宽度，设置后则文字会在限定长度内显示（过多则压缩文字）
```

### drawMultipleLineText 绘制多行文字

可用于绘制一段样式一致的文本
接收参数：

```
ctx (required): canvas上下文
text (optional): 文字，不传则为空
style (optional): 文字样式，不传则为`createTextConfig`默认样式
position (optional): 文字坐标，大小
  x: 绘制开始横坐标，默认为0
  y: 绘制开始纵坐标，默认为0
  maxLength: 最大宽度，默认为500，设置后文字会在限定长度后换行
separator (optional): 分隔符，指定分隔文本用于计算长度的符号
lineSpace (optional): 行间距，默认为0
```

### drawTwoStyledItemsInALine 2 种样式的单行文字

接收参数：

```
ctx (required): canvas上下文
left (optional): 左边文字对象
  style: 文字样式，不传则为`createTextConfig`默认样式，但textAlign无论传什么值，都会被定义为left
  text: 文本
right (optional): 右边文字对象，同上
gap (optional): 左右文字的间隔，默认为0
position (optional): 文字坐标，大小
  centerX: 单行文字绘制的中心横坐标
  y: 绘制的纵坐标
```

### measureTxtWidth 测量文字宽度

接收参数：

```
ctx (required): canvas上下文
str (optional): 不传则0
font (optional): 测量的文字的样式，若在测量前已在canvas上下文设置了文字的样式，则可忽略
```

### drawAvatar 绘制头像

接收参数：

```
ctx (required): canvas上下文
src (required): 头像url
style (optional): 边框样式，不传则为`createShapeConfig`默认样式
position (optional): 头像坐标，大小
  centerX: 头像中心横坐标，默认100
  centerY: 头像中心纵坐标，默认100
  radius: 头像半径，默认100
errMsg (optional): 若报错，显示的文字，默认是：生成头像失败
```

### initCanvas 初始化 canvas

接收参数：

```
canvasId (required): 用于<canvas>的ID
width (required): 画布宽度
height (required): 画布高度
```

返回一个对象，包含属性：

```
context: canvas上下文
dom: canvas元素
```

### getPosterBase64 canvas 转化为 base64 图片

接收参数：

```
canvas(required): canvas元素
```

返回 base64 字符串
