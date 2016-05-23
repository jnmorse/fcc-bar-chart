import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import timeScale from './time-scale'
import valueScale from './value-scale'
import bars from './bars'
import tooltip from './tooltip'
import d3 from 'd3'

class Chart extends Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    api: PropTypes.object
  }

  state = {
    xScale: f => f,
    yScale: f => f,
    svg: {
      width: 1280,
      height: 720
    },
    tooltipPos: {
      x: 0,
      y: 0
    },
    tooltip: {
      show: false,
      date: null,
      money: null
    }
  }

  componentWillMount() {
    this.props.loadData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      xScale: timeScale(nextProps.api, 80, 1200),
      yScale: valueScale(nextProps.api, 20, 700)
    })
  }

  componentDidUpdate() {
    const xAxis = d3.svg.axis().scale(this.state.xScale).orient('bottom')

    d3.select(this._xMount)
      .call(xAxis)

    const yAxis = d3.svg.axis().scale(this.state.yScale).orient('left')

    d3.select(this._yMount)
      .call(yAxis)
  }

  getTooltipPosition(event) {
    const pos = this._svg.getBoundingClientRect()
    this.setState({
      tooltipPos: {
        x: event.clientX - pos.left,
        y: event.clientY - pos.top
      }
    })
  }

  showTooltip(date, money) {
    this.setState({
      tooltip: Object.assign({}, this.state.tooltip, {
        date,
        money,
        show: true
      })
    })
  }

  hideTooltip() {
    const tooltip = Object.assign({}, this.state.tooltip, {
      show: false
    })

    this.setState({ tooltip })
  }

  render() {
    const { api } = this.props

    if (api !== null) {
      let props = {
        xScale: this.state.xScale,
        yScale: this.state.yScale,
        width: (1200 - 20) / api.data.length,
        showTooltip: (...args) => this.showTooltip(...args),
        hideTooltip: () => this.hideTooltip()
      }

      return (
        <figure>
          <header><h1>{api.name}</h1></header>
          <svg
            {...this.state.svg}
            onMouseOver={this.getTooltipPosition.bind(this)}
            ref={svg => { this._svg = svg }}
          >
            <g>
              {bars(api.data, props)}
            </g>

            <g
              className='x-axis axis'
              ref={xMount => { this._xMount = xMount }}
              transform='translate(0, 700)'
            />

            <g
              className='y-axis axis'
              ref={yMount => { this._yMount = yMount }}
              transform='translate(80, 0)'
            />

            {tooltip({...this.state.tooltip, ...this.state.tooltipPos })}
          </svg>
          <figcaption>
            <blockquote>
              {api.description}
              <small>{` - ${api.source_name}`}</small>
            </blockquote>
          </figcaption>
        </figure>
      )
    }

    else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = (state) => {
  return { api: state.api.results || null }
}

export default connect(mapStateToProps, actions)(Chart)
