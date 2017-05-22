import React from 'react';
import {MB} from "./matchbetting.js";

// move to normal js file

class App extends React.Component {
    constructor(props) {
    super(props);
        this.state = {};
        // make below {first: '', SecondBet: '', ThirdBet: '', HowMuch: ''}
        this.test = {first: '34/67', SecondBet: '50/8', ThirdBet: '67/45', HowMuch: '23'};
        this.submit = {submit: 'submit'};
        this.createBets1 = this.createBets1.bind(this);
        this.createBets2 = this.createBets2.bind(this);
        this.createBets3 = this.createBets3.bind(this);
        this.createBets4 = this.createBets4.bind(this);
        this.submitform = this.submitform.bind(this);
    }


    createBets1(event) {
        this.test.first = event.target.value;
    }

    createBets2(event) {
        this.test.SecondBet = event.target.value;
    }

    createBets3(event) {
        this.test.ThirdBet = event.target.value;
    }

    createBets4(event) {
        this.test.HowMuch = event.target.value;
    }

    submitform(event) {
        var results = new MB(this.test.first, this.test.SecondBet, this.test.ThirdBet, this.test.HowMuch);
        this.submit.submit = 'update'; // not updating
    }

   render() {
      return (
            <form>
              <h2>New Bet</h2>

              <div>
                  <label>Odds for first bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.createBets1} className="MB__input__first-bet" />
              </div>

              <div>
                  <label>Odds for second bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.createBets2} className="MB__input__second-bet" />
              </div>

              <div>
                  <label>Odds for third bet <span>(please enter a fraction e.g. 1/2)</span></label>
                  <input onChange={this.createBets3} className="MB__input__third-bet" />
              </div>

              <div>
                  <label>How much you want to spend <span>(please dont include currency e.g. 20)</span></label>
                  <input onChange={this.createBets4} className="MB__input__ammount-bet" />
              </div>

              <span onClick={this.submitform} className="MB__input__submit">{this.submit.submit}</span>
          </form>
      );
    }
}

export default App;
