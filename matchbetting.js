import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {newsLookUp} from './newsRes.js';
import {makePersentage, bestPosOutome, prdictedWinnings, howMuchForEach, shouldYouBet} from './genericFunctions.js';

// update data retreval to react

// below function creates a prototype
export function MB(FirstBet, SecondBet, ThirdBet, HowMuch) {

    // selctors reused update to react

    // vars only = other vars remove
    const firstBet = FirstBet,
        secondBet = SecondBet,
        thirdBet = ThirdBet,
        HowMuchSpend = HowMuch;

    // amounts devided by three
    // vars only = other vars remove
    const thirdHowMUchToSpend = HowMuchSpend / 3,
        firstBetAmount = thirdHowMUchToSpend,
        secondBetAmount = thirdHowMUchToSpend,
        thirdBetAmount = thirdHowMUchToSpend,

        // make persenatges
        firstBetPersentage = makePersentage(firstBet),
        secondBetPersentage = makePersentage(secondBet),
        thirdBetPersentage = makePersentage(thirdBet),

        // total of all persentages to devid by
        total = firstBetPersentage + secondBetPersentage + thirdBetPersentage,

        // how to slit the money
        moneySplit = firstBetPersentage + secondBetPersentage + thirdBetPersentage,
        firstPersentage = (firstBetPersentage / total) * 100,
        secondPersentage = (secondBetPersentage / total) * 100,
        thirdPersentage = (thirdBetPersentage / total) * 100,

        // how much for each application
        firstAmmount = howMuchForEach(HowMuchSpend, firstPersentage),
        secondAmmount = howMuchForEach(HowMuchSpend, secondPersentage),
        thirdAmmount = howMuchForEach(HowMuchSpend, thirdPersentage),

        // woing out outcome
        predictedOutcome = (prdictedWinnings(firstBetPersentage, secondBetPersentage, thirdBetPersentage, newsLookUp(), firstAmmount, secondAmmount, thirdAmmount) * (bestPosOutome(firstAmmount, secondAmmount, thirdAmmount))),
        bestOutCome = (bestPosOutome(firstBetPersentage, secondBetPersentage, thirdBetPersentage)) * (bestPosOutome(firstAmmount, secondAmmount, thirdAmmount)),

        // results made into numbers
        firstBetResult = Math.round(firstAmmount * 100) / 100,
        secondBetResult = Math.round(secondAmmount * 100) / 100,
        thirdBetResult = Math.round(thirdAmmount * 100) / 100,
        isItRight = shouldYouBet(predictedOutcome, bestOutCome, HowMuchSpend);


    // results for bet
    function finalResult(first, second, third, isItRight) {

        // move to generic function orr error handling js
        // rmove errors
        function removeErrors() {
            $(".MB__input__errorEmpty").remove();
            $(".MB__input__errorNaN").remove();
        }

        // if inputs are empty
        function errorempty() {
            if ($(".MB__input__errorEmpty").hasClass("MB__input__errorEmpty")) {
                removeErrors();
                $(".MB__input").append('<div class="MB__input__errorEmpty">this is still empty</div>');
            } else {
                removeErrors();
                $(".MB__input").append('<div class="MB__input__errorEmpty">this is empty</div>');
            }
        }

        // if inputs are not numbers
        function errorNAN() {
            if ($(".MB__input__errorNaN").hasClass("MB__input__errorNaN")) {
                removeErrors();
                $(".MB__input").append('<div class="MB__input__errorNaN">this is still not a number</div>');
            } else {
                removeErrors();
                $(".MB__input").append('<div class="MB__input__errorNaN">this is not a number</div>');
            }
        }

        // check if valid inputs
        if (isNaN(firstBetResult) || isNaN(secondBetResult) || isNaN(thirdBetResult)) {
            if (firstBet === "" || secondBet === "" || thirdBet === "" || HowMuchSpend === "") {
                return errorempty();
            }
            return errorNAN();
        } else {
            removeErrors();
            $(".MB__recomendations").addClass("MB__recomendations--open");
        }

        // for object
        this.firstBet = firstBet;
        this.secondBet = secondBet;
        this.thirdBet = thirdBet;
        this.isItRight = isItRight;
        this.first = first;
        this.second = second;
        this.third = third;

        (() => {
              const element = (
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
                         <input className="MB__input__con__first"/>
                         <input className="MB__input__con__second"/>
                         <input className="MB__input__con__third"/>
                         <span className="MB__input__con__store">store results</span>
                     </div>

                 </div>
              );
              ReactDOM.render(
                element,
                document.getElementById('MB__recomendations__predict')
              );
          })();

    }

    // create an object
    var theFinalResult = new finalResult(firstBetResult, secondBetResult, thirdBetResult, isItRight);
    this.firstBet = theFinalResult.firstBet;
    this.secondBet = theFinalResult.secondBet;
    this.thirdBet = theFinalResult.thirdBet;
    this.isItRight = theFinalResult.isItRight;
    this.first = theFinalResult.first;
    this.second = theFinalResult.second;
    this.third = theFinalResult.third;
}
