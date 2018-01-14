import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {collecResults} from "./saveRes.js";
import {makePersentage, prdictedWinnings, howMuchForEach, shouldYouBet, errorHandeling, removeErrors} from './genericFunctions.js';
window.Cookies = require("./js.cookie.js");

// below function creates a prototype
export function MB(firstBet, secondBet, thirdBet, HowMuchSpend) {

    // make persenatges
    const firstBetPersentage = makePersentage(firstBet),
        secondBetPersentage = makePersentage(secondBet),
        thirdBetPersentage = makePersentage(thirdBet),

        // total of all persentages to devid by
        total = firstBetPersentage + secondBetPersentage + thirdBetPersentage,

        // how much for each application
        amountPerEach = howMuchForEach(HowMuchSpend, (firstBetPersentage / total) * 100, (secondBetPersentage / total) * 100, (thirdBetPersentage / total) * 100),
        firstAmmount = amountPerEach[0],
        secondAmmount = amountPerEach[1],
        thirdAmmount = amountPerEach[2];

        // results made into numbers
    const firstBetResult = Math.round(firstAmmount * 100) / 100,
        secondBetResult = Math.round(secondAmmount * 100) / 100,
        thirdBetResult = Math.round(thirdAmmount * 100) / 100;

    const isItRight = shouldYouBet(prdictedWinnings(firstAmmount, secondAmmount, thirdAmmount, firstBetPersentage, secondBetPersentage, thirdBetPersentage, HowMuchSpend), HowMuchSpend);

    // results for bet
    function finalResult(first, second, third, isItRight) {

        // check if valid inputs
        if (isNaN(firstBetResult) || isNaN(secondBetResult) || isNaN(thirdBetResult)) {
            if (firstBet === "" || secondBet === "" || thirdBet === "" || HowMuchSpend === "") {
                errorHandeling($(".MB__input"), 'empty');
                return;
            }
            errorHandeling($(".MB__input"), 'NaN');
            return;
        } else {
            removeErrors();
            $(".MB__recomendations").addClass("MB__recomendations--open");
        }

        this.firstBet = firstBet;
        this.secondBet = secondBet;
        this.thirdBet = thirdBet;
        this.isItRight = isItRight;
        this.first = first;
        this.second = second;
        this.third = third;

        (() => {

            class saveRes extends React.Component {

                constructor(props) {
                    super(props);
                    this.saveResults = this.saveResults.bind(this);
                    this.values = {name: 'no name', first: '', second: '', third: ''};  // do not remove no name
                    this.betName = this.betName.bind(this);
                    this.betInput1 = this.betInput1.bind(this);
                    this.betInput2 = this.betInput2.bind(this);
                    this.betInput3 = this.betInput3.bind(this);
                }

                betName(event) {
                    this.values.name = event.target.value;
                }

                betInput1(event) {
                    this.values.first = event.target.value;
                }

                betInput2(event) {
                    this.values.second = event.target.value;
                }

                betInput3(event) {
                    this.values.third = event.target.value;
                }

                saveResults(event) {

                    const setCookie = Cookies.get();

                    let cookiesame;
                    Object.keys(setCookie).map(
                        (x) => {
                            if(x === this.values.name) {
                                cookiesame = false;
                            }
                        }
                    );
                    if (cookiesame !== false) {
                        collecResults([this.values.first, this.values.second, this.values.third], firstBet, secondBet, thirdBet, HowMuchSpend, this.values.name);
                    } else{
                        errorHandeling($(".MB__input__con"), 'valid');
                    }
                }

                render() {
                      return (

                           <div>

                             <h4>The odds</h4>

                             <span>Number 1:<span className="MB__fraction__one">{firstBet}</span></span>
                             <span>Number 2:<span className="MB__fraction__two">{secondBet}</span></span>
                             <span>Number 3:<span className="MB__fraction__three">{thirdBet}</span></span>

                             <h4>THE RECOMENDATION</h4>

                             <span>What the recomended bet is:<span>{isItRight}</span></span>

                             <h4>THE AMOUNTS TO BET</h4>

                             <span>Number 1:<span className="MB__ammount__one">{first}</span></span>
                             <span>Number 2:<span className="MB__ammount__two">{second}</span></span>
                             <span>Number 3:<span className="MB__ammount__three">{third}</span></span>

                             <span>
                                 <h4>the results</h4>
                                 <span className="MB__recomendations__info">(a simple yes or no will serfice, did it win?)</span>
                             </span>

                             <div className="MB__input__con">
                                 <input onChange={this.betInput1} className="MB__input__con__first"/>
                                 <input onChange={this.betInput2} className="MB__input__con__second"/>
                                 <input onChange={this.betInput3} className="MB__input__con__third"/>

                                 <span>
                                     <h4>Bet Name</h4>
                                     <span className="MB__recomendations__info">(Please chose a name for your bet. Make it diffferent from other bet names.)</span>
                                 </span>

                                 <input onChange={this.betName}/>

                                 <span onClick={this.saveResults} className="MB__input__con__store">store results</span>
                             </div>

                         </div>
                      );
                  }
              }

              ReactDOM.render(React.createElement(saveRes), document.getElementById('MB__recomendations__predict'));

          })();

      }

    // create an object
    var x = new finalResult(firstBetResult, secondBetResult, thirdBetResult, isItRight);
    this.firstBet = x.firstBet;
    this.secondBet = x.secondBet;
    this.thirdBet = x.thirdBet;
    this.isItRight = x.isItRight;
    this.first = x.first;
    this.second = x.second;
    this.third = x.third;
}
