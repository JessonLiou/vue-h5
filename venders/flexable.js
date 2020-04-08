(function (window, document) {
  var docEle = document.documentElement

  var setBaseStyle = function () {
    var dpr = window.devicePixelRatio || 1
    if (dpr > 3) {
      dpr = 3
    } else if (dpr < 1) {
      dpr = 1
    } else {
      dpr = Math.ceil(dpr)
    }
    var scale = 1 / dpr

    // reset viewport content
    document.getElementsByName('viewport')[0].setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')

    var deviceWidth = docEle.clientWidth
    var deviceHeight = docEle.clientHeight

    var isLandscape = false// 是否横屏

    // check if is landscape or not
    if (window.orientation === 90 || window.orientation === -90) {
      isLandscape = true
    };

    if (isLandscape) {
      deviceWidth = deviceHeight
    };

    // set font-size
    docEle.style.fontSize = deviceWidth / 10 + 'px'
    // set dpr
    docEle.setAttribute('data-dpr', dpr)
  }
  setBaseStyle()

  // reset font-size
  var tid
  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(setBaseStyle, 300)
  }, false)

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(setBaseStyle, 300)
    };
  }, false)
})(window, document)
