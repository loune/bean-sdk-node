'use strict'

let React = require('react')
let Icon = require('./Icon')
let actions = require('../actions')

class BeanListItem extends React.Component {

  constructor() {
    super()
  }

  _selectDevice(uuid) {
    actions.Actions.selectDevice(uuid)
  }

  render() {
    let liClasses = this.props.device.selected ? 'selected' : ''
    liClasses += ' list-group-item'
    return (
      <li className={liClasses} onClick={this._selectDevice.bind(this, this.props.device.uuid)}>
        <Icon device_type={this.props.device.device_type}/>

        <div className="media-body">
          <strong>{this.props.device.name}</strong>
          <p>{this.props.device.uuid}</p>
        </div>
      </li>
    )
  }
}

module.exports = BeanListItem
