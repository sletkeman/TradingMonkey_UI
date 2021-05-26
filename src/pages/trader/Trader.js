import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Select, InputLabel, MenuItem, Grid } from '@material-ui/core/';
import { DataGrid } from '@material-ui/data-grid';
import './Trader.css';
import { authenticate } from '../../store/etrade/actions';
import { getUsers, getMonkeys, getPositions } from '../../store/monkey/actions';
import { getAccounts, getPortfolio } from '../../store/etrade/actions';


const monkeyColumns = [
  { field: 'Symbol', headerName: 'Symbol', width: 150 },
  { field: 'Shares', headerName: 'Shares', width: 150 },
  { field: 'OpenDate', headerName: 'Open Date', width: 150 },
  { field: 'OpenPrice', headerName: 'Open Price', width: 150 },
  { field: 'isShort', headerName: 'is Short', width: 150 },
  { field: 'CurrentDate', headerName: 'Current Date', width: 150 },
  { field: 'CurrentPrice', headerName: 'Current Price', width: 150 }
];

const etradeColumns = [
  { field: 'positionId', headerName: 'Id', width: 150 },
  { field: 'symbolDescription', headerName: 'Symbol', width: 150},
  { field: 'dateAcquired', headerName: 'Date Acquired', width: 150},
  { field: 'pricePaid', headerName: 'Price Paid', width: 150 },
  { field: 'commissions', headerName: 'Commissions', width: 150},
  { field: 'otherFees', headerName: 'Other Fees', width: 150},
  { field: 'quantity', headerName: 'Quantity', width: 150},
  { field: 'positionIndicator', headerName: 'Position Indicator', width: 150},
  { field: 'positionType', headerName: 'position Type', width: 150},
  { field: 'daysGain', headerName: 'days Gain', width: 150},
  { field: 'daysGainPct', headerName: 'days Gain Pct', width: 150},
  { field: 'marketValue', headerName: 'market Value', width: 150},
  { field: 'totalCost', headerName: 'total Cost', width: 150},
  { field: 'totalGain', headerName: 'total Gain', width: 150},
  { field: 'totalGainPct', headerName: 'total Gain Pct', width: 150},
  { field: 'pctOfPortfolio', headerName: 'pct Of Portfolio', width: 150},
  { field: 'costPerShare', headerName: 'cost Per Share', width: 150},
  { field: 'todayCommissions', headerName: 'today Commissions', width: 150},
  { field: 'todayFees', headerName: 'today Fees', width: 150},
  { field: 'todayPricePaid', headerName: 'today Price Paid', width: 150},
  { field: 'todayQuantity', headerName: 'today Quantity', width: 150},
  { field: 'lotsDetails', headerName: 'lots Details', width: 150},
  { field: 'quoteDetails', headerName: 'quote Details', width: 150}
];

class Trader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      monkeyId: '',
      accountIdKey: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(getUsers())
    this.props.dispatch(getAccounts())
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

  handleAccountChange = async (event) => {
    const accountIdKey = event.target.value;
    this.setState({ accountIdKey })
    this.props.dispatch(getPortfolio(accountIdKey));
  }

  render() {
    const { etradeSessionValid, positions, portfolio } = this.props;
    return (
      <div id="TraderPage">
        <Grid container spacing={3}>
        <Grid item xs={6}>
            <h2>Trading Monkey</h2>
            <Button variant="contained" color="primary">
              Authenticate
            </Button>
          </Grid>
          <Grid item xs={6}>
            <h2>Etrade</h2>
            {!etradeSessionValid && (<Button variant="contained" color="primary" onClick={this.handleClick}>
              Get Etrade Session
            </Button>)}
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Trading Monkey User</InputLabel>
            <Select
              label="User"
              value={this.state.userId}
              onChange={this.handleUserChange}
            >
              {this.props.users.map(u => (<MenuItem value={u.UserID} key={u.UserID}>{u.UserLogin}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel htmlFor="name-native-error">Trading Monkey Account</InputLabel>
            <Select
              label="Monkey"
              value={this.state.monkeyId}
              onChange={this.handleMonkeyChange}
            >
              {this.props.monkeys.map(m => (<MenuItem value={m.MonkeyID} key={m.MonkeyID}>{m.MonkeyName}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel htmlFor="name-native-error">Etrade Account</InputLabel>
            <Select
              value={this.state.accountIdKey}
              onChange={this.handleAccountChange}
            >
              {this.props.accounts.map(a => (<MenuItem value={a.accountIdKey} key={a.accountId}>{a.accountName} - {a.accountMode}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <div style={{ height: 900, width: '100%' }}>
              {positions.length > 0 && (<DataGrid columns={monkeyColumns} rows={positions.map((p, id) => ({ id, ...p }))} />)}
            </div>
          </Grid>
          <Grid item xs={6}>
          <div style={{ height: 900, width: '100%' }}>
              {portfolio.Position && (<DataGrid columns={etradeColumns} rows={portfolio.Position.map((p, id) => ({ id, ...p }))} />)}
            </div>
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
  etradeSessionValid: etrade.sessionValid,
  positions: monkey.positions,
  accounts: etrade.accounts,
  portfolio: etrade.portfolio
});

export default connect(mapStateToProps)(Trader);
