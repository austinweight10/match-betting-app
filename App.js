import React from 'react';
import {MB} from "./matchbetting.js";

///////////////////////////////// update inputs to ''

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        //////////////////////////////////// make below {first: '', SecondBet: '', ThirdBet: '', HowMuch: ''}
        this.inputs = {first: '12/1', SecondBet: '23/4', ThirdBet: '7/3', HowMuch: '60'};
        this.submit = {submit: 'submit'};
        this.betsInput1 = this.betsInput1.bind(this);
        this.betsInput2 = this.betsInput2.bind(this);
        this.betsInput3 = this.betsInput3.bind(this);
        this.betsInput4 = this.betsInput4.bind(this);
        this.submitform = this.submitform.bind(this);
    }

    betsInput1(event) {
        this.inputs.first = event.target.value;
    }

    betsInput2(event) {
        this.inputs.SecondBet = event.target.value;
    }

    betsInput3(event) {
        this.inputs.ThirdBet = event.target.value;
    }

    betsInput4(event) {
        this.inputs.HowMuch = event.target.value;
    }

    submitform(event) {
        var results = new MB(this.inputs.first, this.inputs.SecondBet, this.inputs.ThirdBet, this.inputs.HowMuch);
    }

   render() {
      return (

            <form>

              <h2>New Bet</h2>

              <div>
                  <label>Odds for first bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.betsInput1} className="MB__input__first-bet" />
              </div>

              <div>
                  <label>Odds for second bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.betsInput2} className="MB__input__second-bet" />
              </div>

              <div>
                  <label>Odds for third bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.betsInput3} className="MB__input__third-bet" />
              </div>

              <div>
                  <label>How much you want to spend <span>(please dont include currency e.g. 20)</span></label>
                  <input onChange={this.betsInput4} className="MB__input__ammount-bet" />
              </div>

              <span onClick={this.submitform} className="MB__input__submit">{this.submit.submit}</span>

          </form>

      );
    }
}

export default App;
