import $ from 'jquery';
import json from "./matchbetting.json";
import React from 'react';
import ReactDOM from 'react-dom';
import {readclose, readopen} from './genericFunctions.js';
window.Cookies = require("./js.cookie.js");

// function for adding past results

export function previousRes() {

    const readMC = "Show details", // read/hide vars
        readMHC = "Hide details", // read/hide vars
        previousResultsJson = (() => {

        // data and counter for bet
        let counter = 1,
            element = [];

        const pastData = Cookies.get(), // imported cookie data
             previousResultsArray = Object.keys(pastData).map((e) => { // turn data into array
                 return [Number(e), pastData[e]];
             }),
             prevresults = previousResultsArray.map((i) => { //  create object for each past result

                let dataParse = JSON.parse(i[1]),
                    data = dataParse[Object.keys(dataParse)[0]],
                    prevres = {};

                // calculate winnings
                 const winnings = () => {
                     var one = parseInt(data.finalPayout1),
                         two = parseInt(data.finalPayout2),
                         three = parseInt(data.fianlPayout3);
                     return one + two + three;
                 };

                 prevres[data.name] = (function() {

                     function deleteCookie(element) {
                         element.target.parentElement.parentElement.className = "MB__prev-res__res";
                         element.target.nextSibling.innerHTML = readMC;
                         const cookieName = data.name;
                         Cookies.remove(cookieName);
                         previousRes();
                     }

                     function readMore(element) {
                         if (element.target.innerHTML === 'Hide details'){
                             readclose(element.target, readMC);
                         } else {
                             readopen(element.target, readMHC);
                         }
                     }

                    return (

                          <div className="MB__prev-res__res">

                            <h3 className={data.name}>{data.name}</h3>

                            <div>

                                <h4 className="MB__prev-res__res__the-odds">The odds</h4>
                                <span className="MB__prev-res__res__odds1">Number 1:<span>{data.odds1}</span></span>
                                <span className="MB__prev-res__res__odds2">Number 2:<span>{data.odds2}</span></span>
                                <span className="MB__prev-res__res__odds3">Number 3:<span>{data.odds3}</span></span>

                                <h4 className="MB__prev-res__res__recomendation">The Recomendation</h4>

                                <span className="MB__prev-res__res__was-recomended">What was recomended:<span>{data.RecomendedBet}</span></span>

                                <h4 className="MB__prev-res__res__howfull">Full Amount bet</h4>

                                <span className="MB__prev-res__res__how-much">How much was bet:<span>{data.amountBet}</span></span>

                                <h4 className="MB__prev-res__res__the-ammounts">The amounts bet</h4>

                                <span className="MB__prev-res__res__ammounts1">Number 1:<span>{data.finalBet1}</span></span>
                                <span className="MB__prev-res__res__ammounts2">Number 2:<span>{data.finalBet2}</span></span>
                                <span className="MB__prev-res__res__ammounts2">Number 3:<span>{data.fianlBet3}</span></span>

                                <h4 className="MB__prev-res__res__ammounts3">The Returns</h4>

                                <span className="MB__prev-res__res__res1">Results 1:<span>{data.finalPayout1}</span></span>
                                <span className="MB__prev-res__res__res2">Results 2:<span>{data.finalPayout2}</span></span>
                                <span className="MB__prev-res__res__res3">Results 3:<span>{data.fianlPayout3}</span></span>

                            </div>

                            <div className="MB__prev-res__res__win-details">

                                <span className="MB__prev-res__res__winnings">winnings:<span className={winnings() > 0 ? 'MB__prev-res__res__winnings__win' : 'MB__prev-res__res__winnings__lose'}>{winnings()}</span></span>

                                <button onClick={deleteCookie} className="MB__prev-res__delete">Delete result</button>

                                <button onClick={readMore} className="MB__prev-res__read-more">{readMC}</button>

                            </div>

                        </div>
                    );

            })();

             counter++;
             element.push(prevres[data.name])

         });

         ReactDOM.render(
             <div>{element}</div>,
           document.getElementById('MB__recomendations__previous')
         );

         return prevresults;

    })();

};

previousRes();
