'use strict'

let React = require('react')
let BeanListItem = require('./BeanListItem')
let Store = require('../store')
let actions = require('../actions')

function getDevices() {
  let devices = Store.store.getDevices()
  let deviceArray = []
  for (let i in devices) {
    deviceArray.push(devices[i])
  }
  return {
    devices: deviceArray
  }
}

class BeanList extends React.Component {

  constructor() {
    super()
    this.state = getDevices()

    // Have to use a fat-arrow so that `this` is bound correctly...
    this._onChange = () => {
      this.setState(getDevices())
    }
  }

  componentDidMount() {
    Store.store.addChangeListener(Store.ANY_CHANGE, this._onChange)
    actions.Actions.startScanning()
  }

  componentWillUnmount() {
    Store.store.removeChangeListener(Store.ANY_CHANGE, this._onChange)
  }

  _refreshDeviceList() {
    actions.Actions.refreshDeviceList()
  }

  render() {
    return (
      <div className='bean-list-table bean-list'>
        <ul className="list-group">
          <li className="list-group-header" style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
            <span className="pull-left">
              <h3>Devices</h3>
            </span>
            <button
              className="btn btn-default pull-right center-vertical"
              onClick={this._refreshDeviceList}
              style={{marginTop: 5}}
              >
              <span className="icon icon-arrows-ccw"></span>
            </button>
          </li>
          {this.state.devices.map((d, i)=> <BeanListItem key={i} device={d}/>)}
        </ul>
      </div>
    )
  }
}

module.exports = BeanList
