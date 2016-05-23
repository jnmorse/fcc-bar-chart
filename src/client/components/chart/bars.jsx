import React from 'react'
import Bar from './bar'

const bars = (data, props) => data.map((bar, index) => (
  <Bar
    {...props}
    data={bar}
    key={index}
  />
))

export default bars
