# plugIn
工作中用到的插件

### 页面滚动锚点插件

```
  直接调用 
  new scrollPage("#nav").init()

```

其中  scrollPage有三个参数

elem 点击链接跳转的 元素的父级元素 建议是一个id
speed  滚动的速度  默认 1500  可以自己设置
easing 不同的动画点中设置动画速度  详情请看jquery动画里面的 easing   默认 'swing'

init 函数的参数

elem  点击的元素 默认的是 a标签

例子
```
  new scrollPage("#nav" , '2000' , 'swing' ).init( 'a')

```

效果
![scrollImf](images/scroll.gif)