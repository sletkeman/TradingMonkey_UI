import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {Button, Select, InputLabel, MenuItem, TextField, Grid} from '@material-ui/core/';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import './Trader.css';
import { authenticate } from '../../store/etrade/actions';
import { getUsers } from '../../store/monkey/actions';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  margin: {
    margin: theme.spacing(1),
  }
});

class Trader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      accountId: 0,
    };
  }
  
  handleClick = async () => {
    const { payload } = await this.props.dispatch(authenticate());
    // redirect to etrade for authentication
    if (payload && payload.url) {
      window.location.replace(payload.url);
    }
  }

  componentDidMount() {
    debugger;
    this.props.dispatch(getUsers())
  }

  render() {
      const { classes } = this.props;
      return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.handleClick}>
              Get Etrade Session
            </Button>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="User Login"
              className={clsx(classes.margin, classes.textField)}
              value={this.state.userLogin}
              onChange={this.handleChange('userLogin')}
            />
            <Button variant="contained" color="primary" onClick={this.handleClick}>
              Get Monkeys
            </Button>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Account</InputLabel>
              <Select
                value={this.state.accountId}
                onChange={this.handleChange('account')}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </Grid>
          <Grid item xs={3}>
          {/* <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          /> */}
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

// const mapStateToProps = ({ monkeys }) => ({
//   users: monkeys.users,
//   monkeys: monkeys.monkeys
// });

const mapStateToProps = (arg) => {
  debugger;
  return {
    users: arg.monkeys.users,
    monkeys: arg.monkeys.monkeys
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Trader));
