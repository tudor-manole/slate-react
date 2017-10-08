import { Button, Table, PageHeader, ButtonToolbar, Modal } from 'react-bootstrap';
import React from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom'
var PropTypes = require('prop-types');
var api = require('../utils/api');

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDevice: null,
      showModal: false
    };
  }

  close = () => {
    this.setState({ showModal: false });
    console.log(this.state.showModal);
  }

  open = () => {
    this.setState({ showModal: true });
    console.log(this.state.showModal);
  }

  render() {
    return (
      <div>
        <Button bsSize="small" bsStyle="primary" onClick={this.open}>Edit</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Device</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: props.device
    };
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
              <EditModal device={this.state.device} />
              <Button bsSize="small" bsStyle="danger" onClick={this.props.toggleDelete}>Delete</Button>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }
}


class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      selectedDevice: null
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
        <PageHeader>Device Inventory<br/>
        {!this.state.devices
          ? <small>Number of Devices: Loading</small>
          : <small>Number of Devices: {this.state.devices.length}</small>}
        </PageHeader>
        {!this.state.devices
          ? <p>LOADING!</p>
          : (
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
                  {this.state.devices.map((device) => {
                    return (
                      <Device
                        key={device.hostname}
                        device={device}
                      />
                    )
                  })}
                </tbody>
              </Table>
          )
        }
      </div>
    )
  }
}


export default Devices;
