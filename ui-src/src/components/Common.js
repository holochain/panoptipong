import React, { Component } from "react";


export class Jdenticon extends Component {

  _el = null

  handleRef (el) {
    this._el = el
  }

  componentDidUpdate() {
    window.jdenticon.update(this._el)
  }

  componentDidMount() {
    window.jdenticon.update(this._el)
  }

  render () {
    const {hash, size} = this.props
    return <svg ref={el => this.handleRef(el)} width={size} height={size} data-jdenticon-value={hash}></svg>
  }
}
