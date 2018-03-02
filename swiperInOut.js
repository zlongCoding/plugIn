function swiperInOut() {
  this.VERSION = '1.8.3'
  this._options = {
    container: '.swiper-in-out-container',
    content: '.siwper-page-content',
    direction: 'vertical',
    bgContent: '.swiper-in-out',
    duration: 300,
    moveMax: 100,
    according: 200,
    addClassName: 'active'
  }
  this._coordinates = {
    start: {},
    move: {},
    end: {}
  }
  this._activeClass = 'active'
  this._offset = 0
  this._goto = -1
  this._prev = 0
  this._eventHandlers = {}
  this.transform = 0
  this.nodeListArray = []
  this._nowCount = 0
  //样式，元素计算
  this._containt = document.querySelector(this._options.container)
  this._items = document.querySelectorAll(this._options.content)
  this._bgContent = document.querySelectorAll(this._options.bgContent)
  this._count = this._items.length
  this._width = this._containt.offsetWidth
  this._height = this._containt.offsetHeight
  this.init()
  this.touched()
}
swiperInOut.prototype.init = function() {
  let width = this._width,
    height = this._height,
    allHeoght = height * this._count,
    allWidth = this.width

  if (this._options.direction === 'horizontal') {
    allWidth = width * this._count
    allHeoght = height
  }
  this._containt.style.width = `${allWidth}px`
  this._containt.style.height = `${allHeoght}px`


  for (var i = 0; i < this._count; i++) {
    this._items[i].style.width = `${width}px`
    this._items[i].style.height = `${height}px`
  }
  this._items[0].classList.add(this._options.addClassName)
  this._activate(0)
}
swiperInOut.prototype.touched = function() {
  this._containt.addEventListener('touchstart', (e) => {
    this._coordinates.start.x = e.changedTouches[0].pageX
    this._coordinates.start.y = e.changedTouches[0].pageY
    this._containt.style['-webkit-transition'] = 'none';
    this._containt.style.transition = 'none';

    e.preventDefault()
  }, false)
  this._containt.addEventListener('touchmove', (e) => {
    this._coordinates.move.x = e.changedTouches[0].pageX
    this._coordinates.move.y = e.changedTouches[0].pageY

    let mobileDistance = this._coordinates.move.y - this._coordinates.start.y
    this.transform = mobileDistance - this._offset

    let transform = `translate3d(0, ${this.transform}px, 0)`
    if (this._options.direction === 'horizontal') {
      mobileDistance = this._move.x - this._start.x
      transform = `translate3d(${this.transform}px, 0, 0)`
    }
    if (mobileDistance > 0) {
      if (this._count - 1 >= this._nowCount && this._nowCount > 0) {
        this._containt.style.background = window.getComputedStyle(this._items[this._nowCount - 1]).backgroundColor
      } else {
        this._containt.style.background = window.getComputedStyle(this._bgContent[0]).backgroundColor
      }
    } else {
      if (this._count - 1 > this._nowCount && this._nowCount >= 0) {
        this._containt.style.background = window.getComputedStyle(this._items[this._nowCount + 1]).backgroundColor
      } else {
        this._containt.style.background = window.getComputedStyle(this._bgContent[0]).backgroundColor
      }
    }

    this._containt.style['-webkit-transform'] = transform
    this._containt.style.transform = transform
    e.preventDefault()
  }, false)
  this._containt.addEventListener('touchend', (e) => {
    this._coordinates.end.x = e.changedTouches[0].pageX
    this._coordinates.end.y = e.changedTouches[0].pageY

    let mobileDistance = this._coordinates.end.y - this._coordinates.start.y
    if (this._options.direction === 'horizontal') {
      mobileDistance = this._coordinates.end.x - this._coordinates.start.x
    }
    this._prev = this._nowCount
    if (mobileDistance > this._options.moveMax) {
      this._nowCount = this._nowCount === 0 ? 0 : --this._nowCount;
    } else if (mobileDistance < -this._options.moveMax) {
      this._nowCount = this._nowCount < (this._count - 1) ? ++this._nowCount : this._nowCount;
    }
    if (Math.abs(mobileDistance) > this._options.moveMax) {
      this.showContent(this._nowCount)
    }
    e.preventDefault()
  }, false)
}


swiperInOut.prototype.showContent = function(count) {

  this._offset = count * this._height
  let transform = `translate3d(0, ${-this._offset}px, 0)`

  if (this._options.direction === 'horizontal') {
    this._offset = count * this._width
    transform = `translate3d(${-this._offset}px, 0, 0)`
  }

  const duration = `${this._options.duration}ms`
  this._containt.style['-webkit-transition'] = duration
  this._containt.style.transition = duration
  this._containt.style['-webkit-transform'] = transform
  this._containt.style.transform = transform


  this._activate(this._nowCount)
  // clearTimeout(this._timeout)
  // this._timeout = setTimeout((count) => {
  //   this._activate(this._nowCount)
  // }, this._options.according)

}

swiperInOut.prototype._activate = function(count) {
  this.nodeListArray = []
  const className = this._options.addClassName
  for (let i = 0; i < this._items.length; i++) {
    if (i === count) {

      for (var j = 0; j < this._items[i].children.length; j++) {
        if (this._items[i].children[i] && this._items[i].children[i].children > 0) {

        } else {
          var classNames = this._items[i].children[j].className
          var classArray = classNames.split(' ')
          this.nodeListArray.push(classArray)
        }
      }
      for (var k = 0; k < this.nodeListArray.length; k++) {
        for (var p = 0; p < this.nodeListArray[k].length; p++) {
          this._items[i].children[k].classList.remove(this.nodeListArray[k][p])
        }
      }
      setTimeout(() => {
        this._items[i].classList.add(className)
        for (var h = 0; h < this.nodeListArray.length; h++) {
          for (var y = 0; y < this.nodeListArray[h].length; y++) {
            this._items[i].children[h].classList.add(this.nodeListArray[h][y])
          }
        }
      }, 100)
    } else {
      this._items[i].classList.remove(className)
    }
  }
}

window.swiperInOut = swiperInOut