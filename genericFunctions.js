import $ from 'jquery';

// build recusive function for weighting based on odds / if lots more ned to mirror
// finishe what we think best prediction will be
// prdictedWinnings needs to infulece recomendation comment

function createPer(x) {
    const y = x.split('/');
    return parseInt(y[0], 10) / parseInt(y[1], 10);
}

// turn fractions into presentages num to 100 - important == this is not the actual sum not for calculating results -- for working out bet amounts
export function makePersentage(x) {
    const z = createPer(x);
    return  Math.floor(z * 100);
};

// turn fractions into presentages num to 1 - important == this is the actual sum for calculating results
export function makePersentageActual(x) {
    const z = createPer(x);
    return  Math.floor(z * 1);
}

// is correct? yes / no
export function anountReturned(result, fraction, amount) {
    if (result === "yes" || result === "Yes" || result === "correct" || result === "YES") {
        return fraction * amount;
    } else {
        return 0;
    }
}

// best outcome
export function bestPosOutome(first, second, third) {
    if (first > second) {
         if (first > third) {
             return first;
         } else {
             return third;
         }
    } else {
        if (second > third) {
            return second;
        } else {
            return third;
        }
    }
}

// whet we think the winnings will be
export function prdictedWinnings(first, second, third, newspredict, firstAmmount, secondAmmount, thirdAmmount) {
    // most probable outcome based on news and persntages * amount recomended
    const bestOut = bestPosOutome(first, second, third);

    function checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount) {
        // check whoever wins we do not lose loads/anything
        const one = first * firstAmmount,
            two = second * secondAmmount,
            three = third * thirdAmmount,
            persentageLessAllowed = ""; // as num not persentag

        // check if how far all of these are off the orignal spend by persentage and make sure fav is over
        return !one < persentageLessAllowed || two < persentageLessAllowed || three < persentageLessAllowed;

    }

    // this needs to influence whats recomended comment
    if (checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount) && (((newspredict * firstAmmount) >= firstAmmount) && ((newspredict * secondAmmount) >= secondAmmount) && ((newspredict * thirdAmmount) >= thirdAmmount))) {
        // good
        return true;
    } else if ((bestOut === newspredict) && checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount)) {
        // safyiish
        return true;
    } else if ((bestOut === newspredict) && (((newspredict * secondAmmount) >= firstAmmount) && ((newspredict * secondAmmount) >= secondAmmount) && ((newspredict * thirdAmmount) >= thirdAmmount))) {
        // risky
        return true;
    } else {
        return false;
    }
}

// persentage for each
export function howMuchForEach(amount, persentage) {
    return (amount * persentage) / 100;;
}

// is bet good function - waiting on/needs to take into account prdictedWinnings
export function shouldYouBet(predictedOutcome, bestOutCome, HowMuchSpend) {

    // is it safe to bet garanteed win?
    if (predictedOutcome) {
        return 'No';
    // will the returns be worth it?
    } else if (bestOutCome > ((HowMuchSpend * 2) / 1.3)) {
        return 'Would advise against';
    } else {
        return 'Yes go for it';
    }
}
