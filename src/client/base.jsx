import React, { Component } from 'react'
import Chart from './components/chart'

export default class Base extends Component {
  render() {
    return (
      <div className='base-component'>
        <Chart />
      </div>
    )
  }
}
