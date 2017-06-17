import $ from 'jquery';
import json from "./matchbetting.json";
import React from 'react';
import ReactDOM from 'react-dom';

// function for adding past results

// render previous results when added to cookie and from cokkie


(() => {

    // read/hide vars
    const readMC = "Show details",
        readMHC = "Hide details",
        previousResultsJson = (() => {

        // json data and counter for bet
        let counter = 1;
        let element = [];
        const pastData = json, // imported json data
             previousResultsArray = Object.keys(pastData).map((e) => { // turn data into array
                 return [Number(e), pastData[e]];
             }),
             prevresults = previousResultsArray.map((i) => { //  create object for each past result

            // calculate winnings
             const winnings = () => {
                 var one = parseInt(i[1].finalPayout1),
                     two = parseInt(i[1].finalPayout2),
                     three = parseInt(i[1].fianlPayout3);
                 return one + two + three;
             };

             let prevres = {};

             prevres[i[1].name] = (

                  <div className="MB__prev-res__res">

                    <h3>Bet {counter}</h3>

                    <div>

                        <h4 className="MB__prev-res__res__the-odds">The odds</h4>
                        <span className="MB__prev-res__res__odds1">Number 1:<span>{i[1].odds1}</span></span>
                        <span className="MB__prev-res__res__odds2">Number 2:<span>{i[1].odds2}</span></span>
                        <span className="MB__prev-res__res__odds3">Number 3:<span>{i[1].odds3}</span></span>

                        <h4 className="MB__prev-res__res__recomendation">The Recomendation</h4>

                        <span className="MB__prev-res__res__was-recomended">What was recomended:<span>{i[1].RecomendedBet}</span></span>

                        <h4 className="MB__prev-res__res__howfull">Full Amount bet</h4>

                        <span className="MB__prev-res__res__how-much">How much was bet:<span>{i[1].amountBet}</span></span>

                        <h4 className="MB__prev-res__res__the-ammounts">The amounts bet</h4>

                        <span className="MB__prev-res__res__ammounts1">Number 1:<span>{i[1].finalBet1}</span></span>
                        <span className="MB__prev-res__res__ammounts2">Number 2:<span>{i[1].finalBet2}</span></span>
                        <span className="MB__prev-res__res__ammounts2">Number 3:<span>{i[1].fianlBet3}</span></span>

                        <h4 className="MB__prev-res__res__ammounts3">The Returns</h4>

                        <span className="MB__prev-res__res__res1">Results 1:<span>{i[1].finalPayout1}</span></span>
                        <span className="MB__prev-res__res__res2">Results 2:<span>{i[1].finalPayout2}</span></span>
                        <span className="MB__prev-res__res__res3">Results 3:<span>{i[1].fianlPayout3}</span></span>

                    </div>

                    <div>

                        <span className="MB__prev-res__res__winnings">winnings:<span>{winnings()}</span></span>
                        <button className="MB__prev-res__read-more">{readMC}</button>

                    </div>

                </div>
            );

             counter++;
             element.push(prevres[i[1].name])

         });

         ReactDOM.render(
             <div>{element}</div>,
           document.getElementById('MB__recomendations__previous')
         );

         return prevresults;

    })();

    // read mmore function
    var read = () => {
        // show more on click
        $(".MB__prev-res__read-more").one("click", function() {
            $(this).parent().parent().addClass("MB__prev-res--open");
            $(this).text(readMHC);
            $(this).one("click", function() {
                $(this).parent().parent().removeClass("MB__prev-res--open");
                $(this).text(readMC);
                read();
            });
        });
    }
    read();

})();
