import d3 from 'd3'

export default function({ data }, start = 0, end = 720) {
  return d3.scale.linear()
    .domain(d3.extent(data, d => Math.round(d[1])))
    .range([end, start])
}
