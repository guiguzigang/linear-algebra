import Matrix from '@/matrix'
const points = [[0, 0], [0, 5], [3, 5], [3, 4], [1, 4], [1, 3], [2, 3], [2, 2], [1, 2], [1, 0], [0, 0]],
  svg = d3.select('svg'),
  width = window.innerWidth,
  height = window.innerHeight,
  range = height / 2.1,
  transfrom = `translate(${width / 2}, ${height / 2})`,
  scaleX = d3
    .scaleLinear()
    .domain([-10, 10])
    .range([-range, range]),
  scaleY = d3
    .scaleLinear()
    .domain([10, -10])
    .range([-range, range]),
  axisBottom = d3.axisBottom().scale(scaleX),
  axisLeft = d3.axisLeft().scale(scaleY),
  axisX = svg
    .append('g')
    .attr('transform', transfrom)
    .attr('class', 'axis-x')
    .call(axisBottom),
  axisY = svg
    .append('g')
    .attr('transform', transfrom)
    .attr('class', 'axis-y')
    .call(axisLeft),
  linePath = d3
    .line()
    .x(d => scaleX(d[0]))
    .y(d => scaleY(d[1]))
draw(points, 'red')

const P = new Matrix(points)
// X轴扩大1.5倍，y轴扩大2倍
// const t = new Matrix([[1.5, 0], [0, 2]])
// X轴翻转
// const t = new Matrix([[1, 0], [0, -1]])
// Y轴翻转
// const t = new Matrix([[-1, 0], [0, 1]])
// 原点翻转
// const t = new Matrix([[-1, 0], [0, -1]])
// X轴错切
// const t = new Matrix([[1, 0.5], [0, 1]])
// Y轴错切
// const t = new Matrix([[1, 0], [0.5, 1]])
// X,Y轴错切
// const t = new Matrix([[1, 0.5], [0.5, 1]])
// 旋转 60度
const theta = -Math.PI / 3
// const t = new Matrix([[Math.cos(theta), Math.sin(theta)], [-Math.sin(theta), Math.cos(theta)]])
// 翻转
// const t = new Matrix([[0, -1], [1, 0]]) 同下旋转-90度
const t = new Matrix([[Math.cos(theta), Math.sin(theta)], [-Math.sin(theta), Math.cos(theta)]])
draw(t.dot(P.T), 'blue')

function draw(points, color) {
  return (
    svg
      .append('g')
      .attr('transform', transfrom)
      .attr('class', 'g-fpath')
      .append('path')
      .attr('class', 'fpath')
      .attr('d', linePath(points))
      .attr('stroke', color)
      // .attr("stroke-width","3px")
      .attr('fill', 'none')
  )
}
