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

    let xfav, yfav;
    if (x === fav) {
        xfav = true;
        fav = oneOutput;
        other1 = twoOutput;
        other2 = threeOutput;
    } else if (y === fav) {
        yfav = true;
        other2 = oneOutput;
        fav = twoOutput;
        other1 = threeOutput;
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
            per1 = (90 / 100) * other1In;
            per2 = (70 / 100) * other2In;
        } else {
            per1 = (70 / 100) * other1In;
            per2 = (90 / 100) * other2In;
        }

        other1 = other1In - per1; // update outer vars
        other2 = other2In - per2; // update outer vars
        fav = favIn + (per1 + per2); // update outer vars

    })(fav, other1, other2);

    if (xfav) {
        one = fav;
        two = other1;
        three = other2;
    } else if (yfav) {
        one = other2;
        two = fav;
        three = other1;
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

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}


export function prdictedWinnings(first, second, third, firstAmmount, secondAmmount, thirdAmmount, amountBet) {

    // first, second, third, = the percents
    // firstAmmount, secondAmmount, thirdAmmount, = bet amounts
    // amountBet = total amount bet

    // returns
    // what the most likely bet persentage is 0
    // that the arg position is 1
    // wether this covers other bets 2
    function mostLikely(x, y, z, per, amount) {

        let min = Math.min(x, y, z),
            argNum = 0,
            doesAmountCoverOtherBets;

            console.log(min)

            if (min === y) {
                argNum = 1;
            } else if (min === z) {
                argNum = 2;
            }

            if ((min * per[argNum]) > 0) {
                doesAmountCoverOtherBets = true;
            } else {
                doesAmountCoverOtherBets = false;
            }


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
    // true if all bets are within the reach of the largest odds
    function howSimularAreTheOdds(first, second, third) {

        const largetNum = Math.max(first, second, third),
            smallestNum = Math.min(first, second, third),

            one = Math.abs(first - second),
            two = Math.abs(second - third),
            three = Math.abs(third - first),
            differance = largetNum / 4, // either up differance or shrink margin if this is yes to often
            margin = 0.5;

        if ((one * differance) > margin && (two * differance) > margin && (three * differance) > margin) {
            return false;
        } else {
            return true;
        }

    }

    // returns
    // true or false if one does = 0
    // need to know which ones arg = 1
    function MostLikelyBuyALot(one, two, three, amtBet) {

        // ** check if any bets cover whole
        let bet1 = one[0] * one[1],
            bet2 = two[0] * two[1],
            bet3 = three[0] * three[1],

            doesIt,
            argnm,
            amountToBeWon;

        let amoutReturned = [bet1, bet2, bet3];

        if (bet1 > amtBet || bet2 > amtBet || bet3 > amtBet) {
            doesIt = true;
            if (bet1 > amtBet) {
                argnm = 0;
            } else if (bet2 > amtBet) {
                argnm = 1;
            } else if (bet3 > amtBet) {
                argnm = 2;
            }
        } else {
            argnm = null;
            doesIt = false;
        }
        // ** check if any bets cover whole

        // ** is same as most likely
          let theMostLikely = mostLikely(firstAmmount, secondAmmount, thirdAmmount, [first, second, third], amountBet)[1];

          console.log(doesIt, 'doesIt')
          console.log(amoutReturned[argnm], 'amoutReturned[argnm]')
          console.log((amtBet + ((30 / 100) * amtBet)), '(amtBet + ((30 / 100) * amtBet)')
          console.log(amoutReturned[argnm] > (amtBet + ((30 / 100) * amtBet)))

          if (doesIt && theMostLikely === argnm && amoutReturned[argnm] > (parseInt(amtBet) + ((30 / 100) * parseInt(amtBet)))) {
            // ** how much is return compared to whole
            amountToBeWon = true
            // ** how much is return compared to whole
          } else {
            amountToBeWon = false;
          }
        // ** is same as most likely

        return [doesIt, argnm, amountToBeWon];
    }

    // returns
    // true or false = 0
    // which one has a chance = 1
    // odds = 2
    function doesAnyOfTheOutsidersHaveAchance(x, y, z) {

        // need to check second as well
        let mostUnlikely = Math.max(x, y, z),
            mostLikely = Math.min(x, y, z);

        let middleNumber = [];
        middleNumber.push(mostUnlikely);
        middleNumber.push(mostLikely);
        middleNumber = arr_diff(middleNumber, [x, y, z]);

        let hasChance = [],
            argNum = [],
            odds = [];

        function haveChance(x) {
          if (Math.abs(x) < (mostLikely / 4)) {
              if (mostUnlikely === x) {
                  argNum.push(0);
                  odds.push(x);
              } else if (mostUnlikely === y) {
                  argNum.push(1);
                  odds.push(y);
              } else {
                  argNum.push(2);
                  odds.push(z);
              }
          } else {
              hasChance.push(false);
          }
        }

        haveChance(mostUnlikely)
        haveChance(middleNumber)

        return [!hasChance.length, argNum, odds];

    }


    // // returns
    // // do all best cover full amount = 3
    // function areAllBetsCovered(one, two, three, fAmt, sAmt, tAmt, aBet) {
    //
    //     let collectRes = [],
    //         collect = [];
    //
    //     const betammount = parseInt(aBet);
    //
    //     function chechD(x, y, z, xx, yy, zz, num) {
    //
    //         collect[num] = [];
    //         collect[num].push(x * xx);
    //         collect[num][0] = collect[num][0] - yy;
    //         collect[num][0] = collect[num][0] - zz;
    //
    //         if (num === 2) {
    //             return collect;
    //         }
    //
    //         num = num + 1;
    //
    //         chechD(y, z, x, yy, zz, xx, num);
    //     }
    //
    //     chechD(one, two, three, fAmt, sAmt, tAmt, 0);
    //
    //     return [collect[0] > betammount && collect[1] > betammount && collect[2] > betammount];
    //
    // }

    return [
      bestPosOutome([first, firstAmmount], [second, secondAmmount], [third, thirdAmmount], amountBet),
      mostLikely(firstAmmount, secondAmmount, thirdAmmount, [first, second, third], amountBet),
      howSimularAreTheOdds(first, second, third),
      MostLikelyBuyALot([first, firstAmmount], [second, secondAmmount], [third, thirdAmmount], amountBet),
      doesAnyOfTheOutsidersHaveAchance(first, second, third),
      // areAllBetsCovered(first, second, third, firstAmmount, secondAmmount, thirdAmmount, amountBet)
    ];
}

export function shouldYouBet(predictedOutcome, HowMuchSpend) {

    const bestPosOutome = predictedOutcome[0],
        mostLikely = predictedOutcome[1],
        howSimularAreTheOdds = predictedOutcome[2],
        MostLikelyBuyALot = predictedOutcome[3],
        doesAnyOfTheOutsidersHaveAchance = predictedOutcome[4];

    // yes = mosty likely very likly and return on it is good
    // risky = odds are fairly simular but good returns on most likely
    // no = odds are simular and ods are not very good

    const mostLikelyWinsAndBuyALot = mostLikely[2] && MostLikelyBuyALot[2];
    // no
    const no = howSimularAreTheOdds || !mostLikely[2];
    const risky = howSimularAreTheOdds && mostLikelyWinsAndBuyALot;
    const yes = mostLikelyWinsAndBuyALot && !doesAnyOfTheOutsidersHaveAchance[0];

    console.log(mostLikely[2])
    console.log(MostLikelyBuyALot[2])
    console.log(!doesAnyOfTheOutsidersHaveAchance[0])

    if (no) {
        return 'no dont bet';
    } else if (risky) {
        return 'risky bet';
    } else if (yes) {
        return 'yes bet';
    } else {
        return 'no dont think so';
    }


}
