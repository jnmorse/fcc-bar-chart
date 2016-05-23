import React from 'react'

function tooltip(tip) {
  const height = 50
  const width = 150

  const pos = {
    x: tip.x + width < 1280 ? tip.x : tip.x - width,
    y: tip.y + height < 720 ? tip.y : tip.y - height
  }

  if (tip.show) {
    return (
      <g>
        <rect
          {...pos}
          fill='green'
          height={height}
          width={width}
        />

        <text
          {...pos}
          dx={5}
          dy={20}
          fill='black'
        >
          {tip.date}
        </text>

        <text
          {...pos}
          dx={5}
          dy={40}
          fill='black'
        >{tip.money} Billion</text>
      </g>
    )
  }

  return null
}

export default tooltip
