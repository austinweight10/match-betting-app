import $ from 'jquery';
import {MB} from "./matchbetting.js";
import {makePersentageActual, anountReturned} from './genericFunctions.js';

// function for collecting past results

// update retreving elements from dom to react
// create function to add to database

export function collecResults(parent) {

    // get resuts from dom - need to update to react
    const firstResult = parent.find(".MB__input__con__first").val(), // need to make sepcific to each result
        secondResult = parent.find(".MB__input__con__second").val(), // need to make sepcific to each result
        thirdResult = parent.find(".MB__input__con__third").val(); // need to make sepcific to each result

    const results = new MB();

    // make fractions persentages
    const fractionOne = makePersentageActual(results.firstBet),
        fractionTwo = makePersentageActual(results.secondBet),
        fractionThree = makePersentageActual(results.thirdBet);

    // check how much for each
    const firstResultFinal = anountReturned(firstResult, fractionOne, results.first),
        secondResultFinal = anountReturned(secondResult, fractionTwo, results.second),
        thirdResultFinal = anountReturned(thirdResult, fractionThree, results.third);

    // check results not empty
    // need error handling here // make other error handling global
    if (firstResult !== "" && secondResult !== "" && thirdResult !== "") {

        // add to json
        // needs building this will require node
        (() => {

            // need to create objsect to append

            // can be removed just to check results
            console.log(makeResfirstbet + "," +
            makeRessecondbet  + "," +
            makeResthirdbet + "," +
            results.first + results.second + results.third + "," +
            results.isItRight + "," +
            makeResfirstamount + "," +
            makeRessecondammount + "," +
            makeResthirdammount  + "," +
            firstResultFinal  + "," +
            secondResultFinal  + "," +
            thirdResultFinal );

            // add to database function here
            // add to cokkie
            // destroy predictions and restet inputs

        })(); // add results to json
    }
}
