import React from 'react'

function tooltip(tip) {
  const height = 50
  const width = 150

  const pos = {
    x: tip.x + width < (1280 - 10) ? tip.x + 10 : tip.x - width - 10,
    y: tip.y + height < (720 - 10) ? tip.y + 10 : tip.y - height - 10
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
          dx={10}
          dy={20}
          fill='black'
        >
          {tip.date}
        </text>

        <text
          {...pos}
          dx={10}
          dy={40}
          fill='black'
        >{tip.money} Billion</text>
      </g>
    )
  }

  return null
}

export default tooltip
