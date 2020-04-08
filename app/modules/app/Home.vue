<template>
  <div class="home-wrapper">
    {{$t('sample')}}
    <img src="@/assets/images/logo.svg" srcset="@/assets/images/test-picture@2x.jpg 2x, @/assets/images/test-picture@3x.jpg 3x" />
    <div class="box"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';

.home-wrapper {
  color: $primary-color;
  // 设置字体大小
  // @include font-size(12px);
}

img {
  // 设置元素固定尺寸
  @include size-style(width, 160px);
  @include size-style(height, 160px);
  border: 1px solid;
  // 设置元素相对尺寸
  // width: 5rem;
  // height: 5rem;
}

.box {
  // 设置元素固定尺寸
  margin-left: 1rem;
  @include size-style(width, 160px);
  @include size-style(height, 160px);
  border: 1px solid;

  background-image: url('~@/assets/images/logo.svg'); /*不支持image-set的情况下显示*/
  background: -webkit-image-set(
    url('~@/assets/images/logo.svg') 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
          url('~@/assets/images/test-picture@2x.jpg') 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
          url('~@/assets/images/test-picture@3x.jpg') 3x /* 支持image-set的浏览器的[3倍Retina屏幕] */
  );
  background-size: 100% 100%;
}
</style>
