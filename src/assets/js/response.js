(function (doc, win) {
    var docEl = doc.documentElement
    var screenWidth = docEl.clientWidth
    // var screenWidth = win.screen.width
    docEl.style.fontSize = 20 * (screenWidth / 750) + 'px'
  })(document, window)
  