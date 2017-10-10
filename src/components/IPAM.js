import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {Button} from 'material-ui';
import TextField from 'material-ui/TextField';
var PropTypes = require('prop-types');
var api = require('../utils/api');

class ReserveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.reserveBlock = this.reserveBlock.bind(this);
  }

  reserveBlock(block) {
    api.reserveIPBlock(block);
    this.setState({value:null});
    this.forceUpdate();
  }

  handleChange(event) {
    var state = this.state;
    state.value = event.target.value;
    this.setState(state);
   }

  componentDidMount() {
    api.fetchFreeIPBlocks()
      .then((blocks) => {
        this.setState(function () {
          return {
            freeBlocks: blocks
          }
        });
      });
  }

  render() {
    return (
      <div>
        <TextField
          id="requested_block"
          label="IP Block"
          margin="normal"
          onChange={this.handleChange} />
        <Button raised color="primary" onClick={() => {this.reserveBlock(this.state.value)}} >Request Block</Button>
      </div>
    )
  }
}

class IPAM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeBlocks: null
    };
  }
  componentDidMount() {
    api.fetchFreeIPBlocks()
      .then((blocks) => {
        this.setState(function () {
          return {
            freeBlocks: blocks
          }
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Free IP Blocks</h1>
        {!this.state.freeBlocks
          ? <p>Loading Blocks</p>
          : (
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Free IP Block</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.freeBlocks.map((block) => {
                    return (
                      <TableRow hover key={block}>
                        <TableCell padding="dense" >{block}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <ReserveForm />


            </div>
          )
        }
      </div>
    )
  }
}


export default IPAM;
