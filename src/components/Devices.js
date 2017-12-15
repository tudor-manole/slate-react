import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {Button} from 'material-ui';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
var PropTypes = require('prop-types');
var api = require('../utils/api');


class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        device: Object.assign({}, props.device)
    };
  }

  handleChange = name => event => {
    var state = this.state;
    state.device[name] = event.target.value;
    this.setState(state);
   }

  render() {
    return (
      <Dialog open={this.state.isOpen} onRequestClose={this.props.onCancel}>
        <DialogTitle>Edit Device {this.state.device.hostname}</DialogTitle>
        <DialogContent>
          <TextField
            id="hostname"
            label="Hostname"
            margin="normal"
            defaultValue={this.state.device.hostname}
            onChange={this.handleChange('hostname')} />
          <TextField
            id="model"
            label="Model"
            margin="normal"
            defaultValue={this.state.device.model}
            onChange={this.handleChange('model')} />
          <TextField
            id="serial"
            label="Serial"
            margin="normal"
            defaultValue={this.state.device.serial}
            onChange={this.handleChange('serial')} />
          <TextField
            id="mgmtIP"
            label="Mgmt. IP"
            margin="normal"
            defaultValue={this.state.device.mgmtIP}
            onChange={this.handleChange('mgmtIP')} />
          <TextField
            id="vendor"
            label="Vendor"
            margin="normal"
            defaultValue={this.state.device.vendor}
            onChange={this.handleChange('vendor')} />
          <TextField
            id="rack"
            label="Rack"
            margin="normal"
            defaultValue={this.state.device.rack}
            onChange={this.handleChange('rack')} />
          <TextField
            id="labmodule"
            label="Lab Module"
            margin="normal"
            defaultValue={this.state.device.labmodule}
            onChange={this.handleChange('labmodule')} />
          <TextField
            id="mrv"
            label="MRV"
            margin="normal"
            defaultValue={this.state.device.mrv}
            onChange={this.handleChange('mrv')} />
        </DialogContent>
        <DialogActions>
          <Button raised onClick={this.props.onCancel} color="primary">
            Cancel
          </Button>
          <Button raised onClick={() => {this.props.onSubmit(this.state.device)}} color="accent">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      showEditModal: false,
      editingDevice: null
    };
    this.openEditModal = this.openEditModal.bind(this);
    this.cancelEditModal = this.cancelEditModal.bind(this);
    this.submitEditModal = this.submitEditModal.bind(this);
    this.loadDevicesFromServer = this.loadDevicesFromServer.bind(this);
  }

  loadDevicesFromServer() {
    api.fetchDevices()
    .then((newDevices) => {
      this.setState({devices: newDevices});
    });
    console.log(this.state);
    console.log("finished loadDevicesFromServer");

  }

  componentDidMount() {
    this.loadDevicesFromServer();
  }

  openEditModal(device) {
    console.log("Open Edit Modal for Device: "+ device.hostname);
    this.setState({ editingDevice: device });
    this.setState({ showEditModal: true });
  }

  submitEditModal(newDevice) {
    this.setState({ showEditModal: false });
    api.updateDevice(newDevice);
    this.setState({ editingDevice: null });
    this.loadDevicesFromServer();
  }

  cancelEditModal(device) {
    console.log("Cancel Edit Modal");
    this.setState({ showEditModal: false });
    this.setState({ editingDevice: null });
  }

  render() {
    return (
      <div>
        <h1>Device Inventory</h1>
        {!this.state.devices
          ? <h4>Number of Devices: Loading</h4>
          : <h4>Number of Devices: {this.state.devices.length}</h4>}
        {!this.state.devices
          ? <p>LOADING!</p>
          : (
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Hostname</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Serial</TableCell>
                      <TableCell>Mgmt. IP</TableCell>
                      <TableCell>Vendor</TableCell>
                      <TableCell>Rack</TableCell>
                      <TableCell>Lab Module</TableCell>
                      <TableCell>MRV</TableCell>
                      <TableCell>Controls</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.devices.map((device) => {
                      return (
                        <TableRow key={device.hostname}>
                          <TableCell>{device.hostname}</TableCell>
                          <TableCell>{device.model}</TableCell>
                          <TableCell>{device.serial}</TableCell>
                          <TableCell>{device.mgmtIP}</TableCell>
                          <TableCell>{device.vendor}</TableCell>
                          <TableCell>{device.rack}</TableCell>
                          <TableCell>{device.labmodule}</TableCell>
                          <TableCell>{device.mrv}</TableCell>
                          <TableCell>
                            <Button
                              raised
                              label="Edit"
                              color="primary"
                              onClick={() => {this.openEditModal(device) }}>
                                Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                {!this.state.editingDevice
                  ? null
                  : (
                    <EditModal
                      isOpen={this.state.showEditModal}
                      onSubmit={this.submitEditModal}
                      onCancel={this.cancelEditModal}
                      device={this.state.editingDevice} />
                    )}
              </div>
          )
        }
      </div>
    )
  }
}


export default Devices;
