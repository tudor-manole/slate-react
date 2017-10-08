import { Button, Table, PageHeader, ButtonToolbar, Modal } from 'react-bootstrap';
import React from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom'
var PropTypes = require('prop-types');
var api = require('../utils/api');

class DeviceControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: props.device,
      showEditModal: false
    };
    this.showEditModal = this.showEditModal.bind(this);
  }

  closeEdit() {
    this.setState({ showEditModal: false });
  }

  openEdit() {
    this.setState({ showEditModal: true });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.openEdit}>Edit</Button>
​
        <Modal show={this.state.showEditModal} onHide={this.closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Device {this.state.device.hostname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Hostname: {this.state.device.hostname}</p>
            <p>Model: {this.state.device.model}</p>
            <p>Serial: {this.state.device.serial}</p>
            <p>Mgmt. IP: {this.state.device.mgmtIP}</p>
            <p>Vendor: {this.state.device.vendor}</p>
            <p>Rack: {this.state.device.rack}</p>
            <p>Lab Module: {this.state.device.labmodule}</p>
            <p>MRV: {this.state.device.mrv}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeEdit}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
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
        <p>{this.state.device.hostname}</p>
        <p>{this.state.device.model}</p>
        <p>{this.state.device.serial}</p>
        <p>{this.state.device.mgmtIP}</p>
        <p>{this.state.device.vendor}</p>
        <p>{this.state.device.rack}</p>
        <p>{this.state.device.labmodule}</p>
        <p>{this.state.device.mrv}</p>
        <p>
            <Button bsSize="small" bsStyle="primary" onClick={() => this.props.showEditModal(this.state.device)}>Edit</Button>
            <Button bsSize="small" bsStyle="danger" onClick={() => this.props.showDeleteModal(this.state.device)}>Delete</Button>
        </p>
      </tr>
    )
  }
}


class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null
    };
    this.showEditModal = this.showEditModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }
  componenpidMount() {
    api.fetchDevices()
      .then((devices) => {
        this.setState(function () {
          return {
            devices: devices
          }
        });
      });
  }

  showEditModal(device) {
    console.log("SHOW EDIT MODAL FOR " + device.hostname);
    return (
      <Modal show={true} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Editing Device `"{device.hostname}"`</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }

  showDeleteModal(device) {
    console.log("SHOW DELETE MODAL FOR " + device.hostname);
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
              <div>
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
                          showEditModal={this.showEditModal}
                          showDeleteModal={this.showDeleteModal}
                        />
                      )
                    })}
                  </tbody>
                </Table>
              </div>
          )
        }
      </div>
    )
  }
}


export default Devices;
