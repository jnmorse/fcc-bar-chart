import d3 from 'd3'

export default function timeScale({from_date, to_date}, start = 0, end = 1280) {
  return d3.time.scale()
    .domain([new Date(from_date), new Date(to_date)])
    .range([start, end])
}
