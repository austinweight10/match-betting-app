import $ from 'jquery';
import {MB} from "./matchbetting.js";
window.Cookies = require("./js.cookie.js");
import {makePersentageActual, anountReturned, errorHandeling, removeErrors, finalWinnings, errorValid} from './genericFunctions.js';

// function for collecting past results

//////////////////////// create function to add to db //////////////////////////

export function collecResults(parent, firstamount, secondammount, thirdammount, howmuchwasbet) {

    const results = new MB(firstamount, secondammount, thirdammount, howmuchwasbet);

    // check how much for each
    const firstResultFinal = anountReturned(parent[0], makePersentageActual(results.firstBet), results.first),
        secondResultFinal = anountReturned(parent[1], makePersentageActual(results.secondBet), results.second),
        thirdResultFinal = anountReturned(parent[2], makePersentageActual(results.thirdBet), results.third);

    // check results not empty
    if (parent[0] === "" || parent[1] === "" || parent[2] === "") {
        return errorHandeling($(".MB__recomendations"), 'empty');
    } else if (!(parent[0] === "yes" || parent[0] === "no" || parent[0] === "Yes" || parent[0] === "No" || parent[1] === "yes" || parent[1] === "no" || parent[1] === "Yes" || parent[1] === "No" || parent[2] === "yes" || parent[2] === "no" || parent[2] === "Yes" || parent[2] === "No")) {
        return errorHandeling($(".MB__recomendations"), 'valid');
    } else {

        removeErrors();

        (() => {

            const setCookie = Cookies.get();
            let betNmae = 'Bet' + Object.keys(setCookie).length;

            // array for cookie
            var resultsArray = {
                [betNmae] : {
                    "name": betNmae,
                    "odds1" : results.firstBet,
                    "odds2" : results.secondBet,
                    "odds3" : results.thirdBet,
                    "amountBet" : howmuchwasbet,
                    "RecomendedBet" : results.isItRight,
                    "finalBet1" : results.first,
                    "finalBet2" : results.second,
                    "fianlBet3" : results.third,
                    "finalPayout1" : firstResultFinal,
                    "finalPayout2" : secondResultFinal,
                    "fianlPayout3" : thirdResultFinal,
                    "finalWinnings": finalWinnings([firstResultFinal, secondResultFinal, thirdResultFinal, howmuchwasbet])
                }
            };

            Cookies.set(betNmae, resultsArray, { expires: 10000000000, path: '' });

            $('.MB__input__first-bet, .MB__input__second-bet, .MB__input__third-bet, .MB__input__ammount-bet').val('');
            $('#MB__recomendations__predict div').remove();

            $('#MB__recomendations__predict').append('<div class="MB__recomendations__saved"><span>Your results have been saved.</span></div>');

            setTimeout(
                () => {
                    $(".MB__recomendations").removeClass("MB__recomendations--open");
                    $('#MB__recomendations__predict div').remove();
                    location.reload();
                }, 3000
            )

        })();
    }
}
