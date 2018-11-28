import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Digit(props) {
  return (
    <button
      className="digit"
      onClick={props.onClick} >
      <h3>{props.value}</h3>
    </button>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.digits = [
      7, 8, 9, '/',
      4, 5, 6, 'X',
      1, 2, 3, '-',
      0, '.', '=', '+',
    ];
    this.state = {
      display: "0",
      values: '',
    };
  }

  addOperator(i) {
    if (i === 'X') {
      i = "*";
    }
    this.setState({
      display: '0',
      values: this.state.values + i,
    });
  }

  calcSum() {
    if (this.state.values === '') {
      this.setState({
        display: '0',
      });
      return
    }
    try {
      let total = eval(this.state.values);
      this.setState({
        display: total,
        values: '',
      });
    }
    catch(error) {
      this.setState({
        display: '0',
        values: ''
      })
    }
  }

  handleClick(i) {
    if (['/', 'X', '-', '+'].includes(i)) {
      this.addOperator(i);
    } else if ( i === '=') {
      this.calcSum();
    } else {
      if (this.state.display == '0' || !this.state.display) {
        this.setState({
          display: i,
          values: this.state.values + i,
        });
      } else {
          this.setState({
            display: this.state.display + String(i),
            values: this.state.values + i,
          });
        }
    }
  }

  createDigit(i) {
    return (
      <Digit
        value={this.digits[i]}
        onClick={() => this.handleClick(this.digits[i])}
      />
    );
  }

  createRow(start) {
    let digits = [];
    for (let i = start; i < start + 4; i++) {
      let newDigit = this.createDigit(i);
      digits.push(newDigit)
    }
    return digits
  }

  render() {
    return (
      <div className="calc-body">
        <div className="input-area">
          <h3>{this.state.display}</h3>
        </div>
        <div className="digit-row">
          {this.createRow(0)}
        </div>
        <div className="digit-row">
          {this.createRow(4)}
        </div>
        <div className="digit-row">
          {this.createRow(8)}
        </div>
        <div className="digit-row">
          {this.createRow(12)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
