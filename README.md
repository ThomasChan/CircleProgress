
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

#### LICENSES

The MIT License (MIT)

Copyright (c) 2016 Thomas Chan (http://chenjunhao.cn)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
