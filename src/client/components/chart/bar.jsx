import React from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'

/**
 * @TODO: make into a class component
 * @TODO: Add ability to expand to show more data on hover
 */

function Bar(props) {
  const [xValue, yValue] = props.data
  const formatCurrency = d3.format('$,.2f')
  const formatDate = d3.time.format('%Y - %B')

  const y = props.yScale(yValue)
  const height = 700 - y

  const hoverState = () => props.showTooltip(
    formatDate(new Date(xValue)),
    formatCurrency(yValue)
  )

   // const defaultState = () => props.hideTooltip()

  return (
     <rect
       className='bar'
       fill='blue'
       height={height}
       onMouseLeave={props.hideTooltip}
       onMouseOver={hoverState}
       stroke='#3a0202'
       strokeWidth={1}
       width={props.width}
       x={props.xScale(new Date(xValue))}
       y={y}
     />
   )
}

Bar.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  showTooltip: PropTypes.func,
  hideTooltip: PropTypes.func
}

export default Bar
