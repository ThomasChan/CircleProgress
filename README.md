
# Circle Progress With Canvas

Check the [Demo](http://chenjunhao.cn/circleProgress/)

## Usage

1 Dom element is needed, canvas or div or whatever
```
<canvas id="a" width='200' height='200'></canvas>
```
or
```
<div id="b"></div>
```

2 Then load component js
```
<script src="circleProgress.min.js"></script>
```

3 Then initialization
```
<script>
var circle = new CircleProgress({
	element: document.getElementById('a'),
	current: 0.23
})
</script>
```

4 Two methods
```
circle.draw(0.99)
```
```
circle.restart()
```

5 Configuration
| field | note |
|----|:------:|
|element| dom element |
|width | circle width |
|height | circle height |
|radius | circle radius |
|startAngle | [0 - 360] |
|endAngle | [0 - 360] |
|current | [0 - 1], ep: 0.1/0.01/0.25/0.5 |
|backgroundColor | #fff |
|backgroundLineWidth | 2 |
|circleColor | #fff |
|circleLineWidth | 6 |
|textColor | #fff |
|textEnd | Done/100%/已投满 |
|font | 12px Helvetica Neue |

