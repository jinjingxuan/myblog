---
title: 小程序长列表优化
date: 2020-09-20 11:27:54
categories: 移动端
---
# 小程序长列表优化
* 滚动加载
* 虚拟列表

* 参考：https://zhuanlan.zhihu.com/p/146791824

思路:

1. 一维数组 => 二维数组，每个子数组存放十条数据（一屏）
2. 每加载一屏，计算一下高度，用一个高度数组存储
3. 对每一屏数据位置进行监听，只有在可视范围内展示
4. 为防止过快滚动出现白屏，可视范围扩展至屏幕上下各2000高度

## 具体实现

* 一维数组 => 二维数组

```html
<div :id="'wrp_' + index1" v-for="(question, index) in questionList" :key="index">
	<div v-if="question.length > 0">
		<div v-for="item in question" :key="item.questionId">
            <list-item></list-item>
		</div>
     <div v-else :style="{ height: pageHeightArr[index1] + 'px' }"></div>
</div>
```

* 调用接口

```js
		getQuestionList() {
            // 每次调用接口获取 10 条数据，为一组
            API.getList(params).then(res => {
                this.questionList.push(res)
                this.dataList.push(res)
                // setHeight: 获取高度
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.setHeight()
                    }, 50)
                })
        }
```

* 获取高度与监听

```js
setHeight() {
	const that = this
	const wholePageIndex = this.pageNum - 1
	this.query = wx.createSelectorQuery()
    // 获取 DOM 元素
	this.query.select(`#wrp_${wholePageIndex}`).boundingClientRect()
    // 获取高度
	this.query.exec(function(res) {
		that.pageHeightArr[wholePageIndex] = res[0] && res[0].height
		console.log('高度数组：' + that.pageHeightArr)
	})
    // 监听
	this.observePage(wholePageIndex)
}

observePage(pageIndex) {
    // 监听可视区域上下各 1500 范围内
	const observerObj = wx.createIntersectionObserver().relativeToViewport(
		{ top: 1500, bottom: 1500 }
    )
	observerObj.observe(`#wrp_${pageIndex}`, (res) => {
		if (res.intersectionRatio <= 0) {
            // 不在范围内 设置高度
			this.$set(this.questionList, pageIndex, this.pageHeightArr[pageIndex])
		} else {
            // 在范围内 设置数据
			this.$set(this.questionList, pageIndex, this.dataList[pageIndex])
		}
	})
}
```

## 自定义Vue指令

```js
Vue.directive('el-select-scroll', {
        bind(el, binding) {
            // 获取DOM
            let SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
            let scrollPosition = 0
            SCROLL_DOM.addEventListener('scroll', function () { 

                // 滚动方向: true是向上，false是向下
                let flagToDirection = this.scrollTop - scrollPosition > 0

                // 记录当前的滚动位置
                scrollPosition = this.scrollTop

                // 距离底部小于 120 触发
                const LIMIT_BOTTOM = 120
                let scrollBottom = this.scrollHeight - (this.scrollTop + this.clientHeight) < LIMIT_BOTTOM

                // 将滚动行为告诉组件
                if (flagToDirection && scrollBottom) {
                    binding.value(flagToDirection)
                }
            })       
        }
    })
```

```html
<el-select
  filterable 
  :filter-method="dataFilter1"
  v-el-select-scroll="handleScrollThrittle1"
  placeholder="请选择访问楼盘">
      <el-option
         v-for="item in buildGroup.list"
         :key="item.pid"
         :label="item.groupName"
         :value="item.pid">
      </el-option>
</el-select>
```

