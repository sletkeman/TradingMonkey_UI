import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button, Select, InputLabel, MenuItem, Grid, TextField} from '@material-ui/core/';
import './Trader.css';
import { authenticate } from '../../store/etrade/actions';
import { getUsers, getMonkeys } from '../../store/monkey/actions';


class Trader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      monkeyId: '',
      myDate: new Date()
    };
  }

  componentDidUpdate(prevState, prevProps) {

  }
  
  handleClick = () => {
    this.props.dispatch(authenticate())
  }

  handleChange = async (event) => {
    this.setState({ userId: event.target.value });
    this.props.dispatch(getMonkeys(event.target.value));
  };

  componentDidMount() {
    this.props.dispatch(getUsers())
  }

  render() {
    const { etradeSessionValid } = this.props;
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
              onChange={this.handleChange}
            >
              {this.props.users.map(u => (<MenuItem value={u.UserID} key={u.UserID}>{u.UserLogin}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Account</InputLabel>
            <Select
              label="Monkey"
              value={this.state.monkeyId}
              onChange={(e) => this.setState({ monkeyId: e.target.value })}
            >
              {this.props.monkeys.map(m => (<MenuItem value={m.MonkeyID} key={m.MonkeyID}>{m.MonkeyName}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Date</InputLabel>
            <TextField
              id="date-picker-inline"
              type="date"
              value={this.state.myDate}
              onChange={(e) => this.setState({ myDate: e.target.value })}
            />
          </Grid>
        </Grid>
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
  etradeSessionValid: etrade.sessionValid
});

export default connect(mapStateToProps)(Trader);
