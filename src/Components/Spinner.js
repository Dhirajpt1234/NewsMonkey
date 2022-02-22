import React, { Component } from 'react'
import Loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
          <img className='w-10 h-10' src={Loading} alt="Loading" />
      </div>
    )
  }
}

