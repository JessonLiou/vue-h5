<template>
  <div class="home-wrapper">
    <p>国际化例子：{{$t('sample')}}</p>
    <div>
      <p>高清图问题，img标签 srcset 属性解决方式</p>
      <img src="@/assets/images/logo.svg" srcset="@/assets/images/test-picture@2x.jpg 2x, @/assets/images/test-picture@3x.jpg 3x" />
      <p>背景图的解决方案（存在小部分机型兼容问题）</p>
      <div class="box"></div>
    </div>

    <p>vant 组建使用示例</p>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button plain hairline type="primary">细边框按钮</van-button>

    <div>
      <p>元素尺寸：固定尺寸</p>
      <p class="tip">不随手机尺寸变化而发生变化，也就是说分辨率越高的手机看到的内容越多，使用px作为单位</p>
      <img src="@/assets/images/logo.svg" srcset="@/assets/images/test-picture@2x.jpg 2x, @/assets/images/test-picture@3x.jpg 3x" />
      <p>元素尺寸：相对尺寸</p>
      <p class="tip">有很多实现方式，vw、vh、百分比，同时还支持rem，1rem = 手机宽度的1/10</p>
      <div class="box-rem"></div>
    </div>

    <div>
      <p>1px 边框解决方案</p>
      <p class="tip">可参考淘宝、京东、vant组件中细边框按钮的实现</p>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/variables';

.home-wrapper {
  text-align: center;
}

img {
  // 设置元素固定尺寸
  width: 160px;
  height: 160px;
}

.box {
  display: inline-block;;
  // 设置元素固定尺寸
  width: 160px;
  height: 160px;

  background-image: url('~@/assets/images/logo.svg'); /*不支持image-set的情况下显示*/
  background: -webkit-image-set(
    url('~@/assets/images/logo.svg') 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
          url('~@/assets/images/test-picture@2x.jpg') 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
          url('~@/assets/images/test-picture@3x.jpg') 3x /* 支持image-set的浏览器的[3倍Retina屏幕] */
  );
  background-size: 100% 100%;
}

.box-rem {
  display: inline-block;;
  // 设置元素相对尺寸
  width: 4rem;
  height: 4rem;

  background-image: url('~@/assets/images/logo.svg'); /*不支持image-set的情况下显示*/
  background: -webkit-image-set(
    url('~@/assets/images/logo.svg') 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
          url('~@/assets/images/test-picture@2x.jpg') 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
          url('~@/assets/images/test-picture@3x.jpg') 3x /* 支持image-set的浏览器的[3倍Retina屏幕] */
  );
  background-size: 100% 100%;
}

.tip {
  font-size: 14px;
  color: #ccc;
}
</style>
