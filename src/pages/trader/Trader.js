import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Select, InputLabel, MenuItem, Grid } from '@material-ui/core/';
import { DataGrid } from '@material-ui/data-grid';
import './Trader.css';
import { authenticate } from '../../store/etrade/actions';
import { getUsers, getMonkeys, getPositions } from '../../store/monkey/actions';

const columns = [
  {
    field: 'Symbol', headerName: 'Symbol', width: 150
  }, {
    field: 'Shares', headerName: 'Shares', width: 150
  }, {
    field: 'OpenDate', headerName: 'Open Date', width: 150
  }, {
    field: 'OpenPrice', headerName: 'Open Price', width: 150
  }, {
    field: 'isShort', headerName: 'is Short', width: 150
  }, {
    field: 'CurrentDate', headerName: 'Current Date', width: 150
  }, {
    field: 'CurrentPrice', headerName: 'Current Price', width: 150
  }
]

class Trader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      monkeyId: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(getUsers())
  }
  
  handleClick = () => {
    this.props.dispatch(authenticate())
  }

  handleUserChange = async (event) => {
    this.setState({ userId: event.target.value });
    this.props.dispatch(getMonkeys(event.target.value));
  };

  handleMonkeyChange = async (event) => {
    const monkeyId = event.target.value;
    this.setState({ monkeyId })
    this.props.dispatch(getPositions(monkeyId));
  }

  render() {
    const { etradeSessionValid, positions } = this.props;
    return (
      <div id="TraderPage">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {etradeSessionValid}
            {!etradeSessionValid && (<Button variant="contained" color="primary" onClick={this.handleClick}>
              Get Etrade Session
            </Button>)}
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">User</InputLabel>
            <Select
              label="User"
              value={this.state.userId}
              onChange={this.handleUserChange}
            >
              {this.props.users.map(u => (<MenuItem value={u.UserID} key={u.UserID}>{u.UserLogin}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Account</InputLabel>
            <Select
              label="Monkey"
              value={this.state.monkeyId}
              onChange={this.handleMonkeyChange}
            >
              {this.props.monkeys.map(m => (<MenuItem value={m.MonkeyID} key={m.MonkeyID}>{m.MonkeyName}</MenuItem>))}
            </Select>
          </Grid>
        </Grid>
        <div style={{ height: 900, width: '100%' }}>
          {positions.length > 0 && (<DataGrid columns={columns} rows={positions.map((p, id) => ({ id, ...p }))} />)}
        </div>
      </div>
    );
  }
}

Trader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  monkeys: PropTypes.array.isRequired
};

const mapStateToProps = ({ monkey, etrade }) => ({
  users: monkey.users,
  monkeys: monkey.monkeys,
  etradeSessionValid: etrade.sessionValid,
  positions: monkey.positions
});

export default connect(mapStateToProps)(Trader);
