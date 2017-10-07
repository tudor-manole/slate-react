import { Button, Table, PageHeader, ButtonToolbar, Modal } from 'react-bootstrap';
import React from 'react';
var PropTypes = require('prop-types');
var api = require('../utils/api');

class Device extends React.Component {
  constructor(props) {
    super();
    this.state = {
      device: props.device
      showEditModal: false,
      showDeleteModal: false
    };
  }

  toggleEdit = (showEditModal) => {
    !showEditModal
      ? this.setState({ showEditModal: false })
      : this.setState({ showEditModal: true })
    console.log();
  }

  toggleDelete = (showDeleteModal) => {
    !showDeleteModal
      ? this.setState({ showDeleteModal: false })
      : this.setState({ showDeleteModal: true })
    console.log(showDeleteModal);
  }
  
  render() {
    return (
      <tr key={this.state.device.hostname}>
        <td>{this.state.device.hostname}</td>
        <td>{this.state.device.model}</td>
        <td>{this.state.device.serial}</td>
        <td>{this.state.device.mgmtIP}</td>
        <td>{this.state.device.vendor}</td>
        <td>{this.state.device.rack}</td>
        <td>{this.state.device.labmodule}</td>
        <td>{this.state.device.mrv}</td>
        <td>
          <ButtonToolbar>
              <Button bsSize="small" bsStyle="primary" onClick={this.props.toggleEdit}>Edit</Button>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }
}


class DeviceTable extends React.Component {
  constructor(props) {
    super();
    this.state = {


  render() {
    return(
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>Model</th>
            <th>Serial</th>
            <th>Mgmt. IP</th>
            <th>Vendor</th>
            <th>Rack</th>
            <th>Lab Module</th>
            <th>MRV</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {this.props.devices.map((device) => {
            return (
              <Device
                key={device.hostname}
                device={device}
                toggleEdit={this.toggleEdit}
                toggleDelete={this.toggleDelete}
              />
            )
          })}
        </tbody>
      </Table>
    )
  }
}

DeviceTable.propTypes = {
  devices: PropTypes.array.isRequired,
};

class Devices extends React.Component {
  constructor(props) {
    super();
    this.state = {
      devices: null
    };

  }
  componentDidMount() {
    api.fetchDevices()
      .then((devices) => {
        this.setState(function () {
          return {
            devices: devices
          }
        });
      });
  }

  render() {
    return (
      <div>
        <PageHeader>Device Inventory <br/>
        {!this.state.devices
          ? <small>Number of Devices: Loading</small>
          : <small>Number of Devices: {this.state.devices.length}</small>}
        </PageHeader>



        {!this.state.devices
          ? <p>LOADING!</p>
          : <DeviceTable devices={this.state.devices} />}
      </div>
    )
  }
}

export default Devices;
