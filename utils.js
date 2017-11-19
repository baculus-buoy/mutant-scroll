function assertScrollable(scroller) {
  var f = overflow(scroller)
  if(!/auto|scroll/.test(f))
    throw new Error('scroller.style.overflowY must be scroll or auto, was:' + f + '!')
}


function isFilled(content) {
  return (
    !isVisible(content)
    //check if the scroller is not visible.
    // && content.getBoundingClientRect().height == 0
    //and has children. if there are no children,
    //it might be size zero because it hasn't started yet.
    || content.children.length > 10
    //&& !isVisible(scroller)
  )
}

function isVisible (el) {
  if(!el) return false
  if(el === document.body) return true
  var style = getComputedStyle(el)
  if(style.visibility === 'hidden' || style.display === 'none') return false
  return isVisible(el.parentElement)
}

module.exports = {
  assertScrollable,
  isTop,
  isBottom,
  isFilled,
  isVisible
}


// 'private' functions

function overflow (el) {
  return el.style.overflowY || el.style.overflow || (function () {
    var style = getComputedStyle(el)
    return style.overflowY || el.style.overflow
  })()
}

function isTop (scroller, buffer) {
  return scroller.scrollTop <= (buffer || 0)
}

function isBottom (scroller, buffer) {
  var rect = scroller.getBoundingClientRect()
  var topmax = scroller.scrollTopMax || (scroller.scrollHeight - rect.height)
  return scroller.scrollTop >=
    + ((topmax) - (buffer || 0))
}

