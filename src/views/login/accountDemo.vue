<template>
  <div>
    <canvas id="canvas"></canvas>
    <canvas id="block"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: 0,
      ctx: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      var x = 150, y = 60, w = 42, r = 10, PI = Math.PI
      var canvas = document.getElementById('canvas')
      var block = document.getElementById('block')
      var canvas_ctx = canvas.getContext('2d')
      var block_ctx = block.getContext('2d')
      var img = new Image()
      img.src = './002.jpg'
      // img.crossOrigin = ''
      img.onload = function () {
        canvas_ctx.drawImage(img, 0, 0, 310, 155)
        block_ctx.drawImage(img, 0, 0, 310, 155)
        var blockWidth = w + r * 2
        var _y = y - r * 2 + 2 // 滑块实际的y坐标
        console.log(blockWidth, _y)
        var ImageData = block_ctx.getImageData(x, _y, blockWidth, blockWidth)
        block.width = blockWidth
        console.log(blockWidth, _y, "===")
        block_ctx.putImageData(ImageData, 0, _y)
      };


      draw(canvas_ctx, 'fill')
      draw(block_ctx, 'clip')

      function draw(ctx, operation) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + w / 2, y)
        ctx.arc(x + w / 2, y - r + 2, r, 0, 2 * PI) //
        ctx.lineTo(x + w / 2, y)
        ctx.lineTo(x + w, y)
        ctx.lineTo(x + w, y + w / 2)
        ctx.arc(x + w + r - 2, y + w / 2, r, 0, 2 * PI) //
        ctx.lineTo(x + w, y + w / 2)
        ctx.lineTo(x + w, y + w)
        ctx.lineTo(x, y + w)
        ctx.lineTo(x, y)
        // ctx.beginPath()
        // ctx.arc(x, y + w / 2, r, 1.5 * PI, 0.5 * PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
        ctx.globalCompositeOperation = "xor"
        operation === 'fill' ? ctx.fill() : ctx.clip()
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>