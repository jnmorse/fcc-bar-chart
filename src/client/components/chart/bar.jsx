import React, { PropTypes } from 'react'
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

   const hoverState = event => props.onHover(
     event,
     formatDate(new Date(xValue)),
     formatCurrency(yValue)
   )

   const defaultState = () => props.onLeave()

   return (
     <rect
       className='bar'
       fill='blue'
       height={height}
       onMouseLeave={defaultState}
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
  onHover: PropTypes.func,
  onLeave: PropTypes.func
}

export default Bar
