import $ from 'jquery';

///////// non algorim based functions

// read more function
export function readopen(x, z) {
    x.parentElement.parentElement.className += " MB__prev-res--open";
    x.innerHTML = z;
}

// read more function
export function readclose(x, y) {
    x.parentElement.parentElement.className = "MB__prev-res__res";
    x.innerHTML = y;
}

// remove errors
export function removeErrors() {
    $(".MB__errorEmpty").remove();
    $(".MB__errorNaN").remove();
    $(".MB__errorValid").remove();
}

export function errorHandeling(y, z) {

    let x = [];

    if (z === 'NaN') {
        x = ["MB__errorNaN", '<div class="MB__errorNaN">this is still not a number</div>', '<div class="MB__errorNaN">this is not a number</div>'];
    } else if (z === 'valid') {
        x = ["MB__errorEmpty", '<div class="MB__errorEmpty">this is still not valid</div>', '<div class="MB__errorEmpty">this is not valid</div>'];
    } else {
        x = ["MB__errorValid", '<div class="MB__errorValid">this is still empty</div>', '<div class="MB__errorValid">this is empty</div>'];
    }

    if (y.hasClass(x[0])) {
        removeErrors();
        y.append(x[1]);
    } else {
        removeErrors();
        y.append(x[2]);
    }

}


/////// algorithmic functions

// persentage for each
// needs to be smarter and weight the favorite

// maybe need to take more of the least favorite
export function howMuchForEach(howmuch, x, y, z) {

    let one,
        two,
        three,
        other1,
        other2,
        fav = Math.min(x, y, z),

        oneOutput = (x * howmuch) / 100,
        twoOutput = (y * howmuch) / 100,
        threeOutput = (z * howmuch) / 100;

    if (x === fav) {
        fav = oneOutput;
        other1 = twoOutput;
        other2 = threeOutput;
    } else if (y === fav) {
        other1 = oneOutput;
        fav = twoOutput;
        other2 = threeOutput;
    } else {
        other1 = oneOutput;
        other2 = twoOutput;
        fav = threeOutput;
    }

    ((favIn, other1In, other2In) => {

        let leastFav = Math.max(x, y, z),
            per1,
            per2;

        if (leastFav === other1) {
            per1 = (75 / 100) * other1In;
            per2 = (25 / 100) * other2In;
        } else {
            per1 = (25 / 100) * other1In;
            per2 = (75 / 100) * other2In;
        }

        other1 = other1In - per1; // update outer vars
        other2 = other2In - per2; // update outer vars
        fav = favIn + (per1 + per2); // update outer vars

    })(fav, other1, other2);

    if (x === fav) {
        one = fav;
        two = other1;
        three = other2;
    } else if (y === fav) {
        one =other1;
        two = fav;
        three = other2;
    } else {
        one = other1;
        two = other2;
        three = fav;
    }

    return [one, two, three];

}

function createPer(x) {
    // const y = x.split('/');
    // return parseInt(y[0], 10) / parseInt(y[1], 10);
    return eval(x); // direct eval needs updating
}

// turn fractions into presentages num to 100 - important - this is not the actual sum not for calculating results -- for working out bet amounts
export function makePersentage(x) {
    const z = createPer(x)
    return (z * 100) / 100;
}

// turn fractions into presentages num to 1 - important - this is the actual sum for calculating results
export function makePersentageActual(x) {
    const z = createPer(x);
    return z * 1;
}

// is correct? yes / no
export function anountReturned(x, y, z) {
    if (x === "yes" || x === "Yes") {
        const amountToReturn = y * z;
        return amountToReturn.toFixed(2);  // to fixed as final result
    } else {
        return 0 - z;
    }
}


// calc winnings independent function
export function finalWinnings(el) {

    const times100 = (x) => {
        return x * 100;
    };

    const times = [];
    el.map(
        (x) => {
            times.push(times100(x));
        }
    );

    let final = 0;
    const adding = (x) => {
        final += x;
    };
    times.map((x) => {
        adding(parseInt(x));
    });

    let amountWon = final / 100,
        result = 0;

    if (amountWon > el[3]) {
        result = parseInt(amountWon) - parseInt(el[3]);
    } else if (amountWon < el[3]) {
        result = parseInt(el[3]) - parseInt(amountWon);
    }

    return result;

}


export function prdictedWinnings(first, second, third, firstAmmount, secondAmmount, thirdAmmount, amountBet) {

    // first, second, third, = the percents
    // firstAmmount, secondAmmount, thirdAmmount, = bet amounts
    // amountBet = total amount bet

    console.log(first + 'first');
    console.log(second + 'second');
    console.log(third + 'third');

    // returns
    // what the most likely bet persentage is 0
    // that the arg position is 1
    // wether this covers other bets 2
    function mostLikely(x, y, z, per, amount) {

        let min = Math.min(x, y, z),
            argNum = 0,
            doesAmountCoverOtherBets;

            if (min === y) {
                argNum = 1;
            } else if (min === z) {
                argNum = 2;
            }

            if ((min * per[argNum]) > amount) {
                doesAmountCoverOtherBets = true;
            } else {
                doesAmountCoverOtherBets = false;
            }

            console.log([per[argNum], argNum, doesAmountCoverOtherBets]);

        return [per[argNum], argNum, doesAmountCoverOtherBets];

    }

    // returns
    // return arg position = 0
    // returns is the best outcome woth betting on = 1
    function bestPosOutome(x, y, z, HowMuchSpend ) {

        let persentage,
            argNum = 0;

        if (x > y) {
             if (x > z) {
                 persentage = x[0];
             } else {
                 persentage = x[0];
             }
        } else {
            if (y > z) {
                persentage = x[0];
            } else {
                persentage = x[0];
            }
        }

        if (persentage === y[0]) {
            argNum = 1;
        } else if (persentage === z[0]) {
            argNum = 2;
        }

        const isBestoutcomeWothiIt = persentage * arguments[argNum][1] > ((HowMuchSpend * 2) / 0.25);

        return [argNum, isBestoutcomeWothiIt];

    }

    // returns
    // do all best cover full amount = 3
    function areAllBetsCovered(one, two, three, fAmt, sAmt, tAmt, aBet) {

        let collectRes = [],
            collect = [];

        const betammount = parseInt(aBet);

        function chechD(x, y, z, xx, yy, zz, num) {

            collect[num] = [];
            collect[num].push(x * xx);
            collect[num][0] = collect[num][0] - yy;
            collect[num][0] = collect[num][0] - zz;

            if (num === 2) {
                return collect;
            }

            num = num + 1;

            chechD(y, z, x, yy, zz, xx, num);
        }

        chechD(one, two, three, fAmt, sAmt, tAmt, 0);

        console.log(one, two, three, fAmt, sAmt, tAmt, aBet);
        console.log('areAllBetsCovered');
        console.log(betammount);
        console.log(collect[0]);
        console.log(collect[1]);
        console.log(collect[2]);

        return [collect[0] > betammount && collect[1] > betammount && collect[2] > betammount];

    }

    // returns
    // true or false if one does = 0
    // need to know which ones arg = 1
    function doesABetCoverWhole(one, two, three, amtBet) {

        let bet1 = one[0] * one[1],
            bet2 = two[0] * two[1],
            bet3 = three[0] * three[1],

            doesIt,
            argnm = 0;

        if (bet1 > amtBet || bet2 > amtBet || bet3 > amtBet) {
            doesIt = true;
            if (bet2 > amtBet) {
                argnm = 1;
            } else if (bet3 > amtBet) {
                argnm = 2;
            }
        } else {
            argnm = null;
            doesIt = false;
        }

        return [doesIt, argnm];
    }

    // returns
    // true if all bets are within the reach of the largest odds
    function howSimularAreTheOdds(first, second, third) {

        // make a var containing a number so can easily up and down

        const largetNum = Math.max(first, second, third),
            smallestNum = Math.min(first, second, third),

            one = Math.abs(first - second),
            two = Math.abs(second - third),
            three = Math.abs(third - first),
            differance = largetNum / 4, // either up differance or shrink margin if this is yes to often
            margin = 0.5;

            console.log('howSimularAreTheOdds');
            console.log(one * differance);
            console.log(two * differance);
            console.log(three * differance);
            console.log(margin);

        if ((one * differance) > margin && (two * differance) > margin && (three * differance) > margin) {
            return false;
        } else {
            return true;
        }

    }

    // returns
    // true or false = 0
    // which one has a chance = 1
    // odds = 2
    function doesTheOutsiderHaveAchance(x, y, z) {

        let hasChance,
            argNum = null,
            odds,
            mostUnlikely = Math.max(x, y, z),
            mostLikely = Math.min(x, y, z);

            console.log('doesTheOutsiderHaveAchance');
            console.log(Math.abs(mostUnlikely) < (mostLikely / 2), 'Math.abs(mostUnlikely) < (mostLikely / 2)');
            console.log(Math.abs(mostUnlikely));
            console.log((mostLikely / 4));

        if (Math.abs(mostUnlikely) < (mostLikely / 4)) {
            hasChance = true;
            if (mostUnlikely === x) {
                argNum = 0;
                odds = x;
            } else if (mostUnlikely === y) {
                argNum = 1;
                odds = y;
            } else {
                argNum = 2;
                odds = z;
            }
        } else {
            hasChance = false;
        }

        return [hasChance, argNum, odds];

    }

    const areallcovered = areAllBetsCovered(first, second, third, firstAmmount, secondAmmount, thirdAmmount, amountBet),
        bestPosOutcome = bestPosOutome([first, firstAmmount], [second, secondAmmount], [third, thirdAmmount], amountBet),
        mostLikley = mostLikely(firstAmmount, secondAmmount, thirdAmmount, [first, second, third], amountBet),
        doesABetCoverAll = doesABetCoverWhole([firstAmmount, first], [secondAmmount, second], [thirdAmmount, third], amountBet),
        howSimularOdds = howSimularAreTheOdds(first, second, third),
        outsiderChance = doesTheOutsiderHaveAchance(first, second, third);

    return [areallcovered, bestPosOutcome, mostLikley, doesABetCoverAll, howSimularOdds, outsiderChance];
}

export function shouldYouBet(predictedOutcome, HowMuchSpend) { // always returns no

    // will be renamed when we rename functions
    const areAllBetsCovered = predictedOutcome[0],
        bestPosOutome = predictedOutcome[1],
        mostLikley = predictedOutcome[2],
        doesABetCoverAll = predictedOutcome[3],
        howSimularOdds = predictedOutcome[4],
        outsiderChance = predictedOutcome[5];

    // yes = mosty likely very likly and return on it is very good
    // risky = odds are fairly simular but good returns
    // no = odds are simular and they dont all cover the bet

    // no
    const no1 = howSimularOdds,  // how simular are odds we want to be not simular = false
            no2 = outsiderChance[0], // we dont want the outside to have a chance = false // ******************* are we only going to bet on the favorite

        // yes
        yes1 = mostLikley[2], // does most likely cover other bets
            yes1andGoodYeld = true,
            yes2 = mostLikley[1] === bestPosOutome[0], // does most likely equal best outcome
            yes3 = areAllBetsCovered[0], // do all best cover amount bet // **************** we are flitering out outsider chance will never get here
        yes4 = mostLikley[2]  && outsiderChance[0], // does most likely cover bet and outside has a chnace // **************** we are flitering out outsider chance will never get here
            yes5 = (outsiderChance[2] - mostLikley[0]) < (mostLikley[0] / 2),  // is outside chance odds - most likly chance ods more than most likly divded by 2 // // **************** this is just way to confusing simplify



            // risky
            risky1 = mostLikley[2] && (outsiderChance[1] !== mostLikley[1]); // is most likely larger than other best

console.log(no1, no2, 'no1, no2');
console.log(yes1, mostLikley, 'yes1');
console.log(yes2, yes3, mostLikley, bestPosOutome, areAllBetsCovered, 'yes2, yes3');
console.log(yes4, yes5, mostLikley, outsiderChance,  'yes4, yes5');
console.log(risky1, 'risky1');

console.log(areAllBetsCovered, 'areAllBetsCovered');


    if (no1 || no2) {
        return 'no dont bet';
    } else if (yes1) {
        // if () {
        //
        // }
        return 'yes bet - betting on most likly';
    }  else if (yes2 && yes3) {
        return 'yes bet - strong bet';
    }   else if (yes4 && yes5) {
        return 'yes bet - bit confusing';
    } else if (risky1) {
        return 'this is a risky bet';
    } else {
        return 'no dont bet';
    }

}
