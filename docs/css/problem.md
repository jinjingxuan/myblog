# CSS 常见问题

## last-child 不生效问题

```html
<div>
  <p class="list">1</p>
  <p class="list">2</p>
  <p class="list">3</p>
  <p class="list">4</p>
  <div>footer</div>
</div>

<style>
  .list:last-child {
    color: red;
  }
</style>
```

> el:last-child 的匹配规则是：第一步，查找 el 选择器匹配元素的所有同级元素（siblings）；第二步，在同级元素中查找最后一个元素；第三步，检验最后一个元素是否与选择器 el 匹配。
>
> .list:last-child 匹配到了 div，但 div 不匹配 .list，故选择器不生效。改法如下：

```html
<div>
  <p class="list">1</p>
  <p class="list">2</p>
  <p class="list">3</p>
  <p class="list">4</p>
</div>
<div>footer</div>

<style>
  .list:last-child {
    color: red;
  }
</style>
```

