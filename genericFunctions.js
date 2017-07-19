import $ from 'jquery';

///////////////////////////// build recusive function for weighting based on odds / if lots more need to mirror
/////////////////////////////// finish what we think best prediction will be


///////// non algorim based functions

// read more function
export function read(x, y, z) {
    x.one("click", function() {
        $(this).parent().parent().addClass("MB__prev-res--open");
        $(this).text(z);
        $(this).one("click", function() {
            $(this).parent().parent().removeClass("MB__prev-res--open");
            $(this).text(y);
            read(x, y, x);
        });
    });
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

    if (checkElement.hasClass(x[0])) {
        removeErrors();
        y.append(x[1]);
    } else {
        removeErrors();
        y.append(x[2]);
    }

}


/////// algorithmic functions

// persentage for each
export function howMuchForEach(x, y) {
    return (x * y) / 100;
}


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
    }
    times.map((x) => {
        adding(parseInt(x));
    });

    let amountWon = final / 100,
        result = 0;

    if (amountWon > el[3]) {
        result = parseInt(amountWon) - parseInt(el[3]);
    } else if (amountWon < el[3]) {
        // currently zeroed so cannot be below amount bet // need to stop it being zeroed anountReturned function
        result = parseInt(el[3]) - parseInt(amountWon);
    }

    return result;

};


// best outcome   moved into predict winnings

// whet we think the winnings will be     ////////////////////////////////////////   what a pile of shit fix
export function prdictedWinnings(first, second, third, firstAmmount, secondAmmount, thirdAmmount) {

    //  most likely = smallest persentage
    function mostLikely() {
        return Math.min(first, second, third);
    }

    function bestPosOutome(first, second, third) {
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


    ////////// build a recersive function here  to work out if the amounts recomended will always mean we win money //  then return true or false
    function checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount) {
        // check whoever wins we do not lose loads/anything
        let collectRes = [];

        const x = (first, second, third, firstAmmount, secondAmmount, thirdAmmount) = > {

            
            first * firstAmmount ? true : false;
            two = second * secondAmmount ? true : false;
            three = third * thirdAmmount ? true : false;

            x(second, third, first, secondAmmount, thirdAmmount, firstAmmount);
        }

        return x(first, second, third, firstAmmount, secondAmmount, thirdAmmount);

    }

    return [checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount), bestPosOutome(first, second, third), mostLikely()]

}

////////////////// predicted outcome relys on abve function       //////////// ned to write again
export function shouldYouBet(predictedOutcome, HowMuchSpend) {
    if (predictedOutcome[0]) {
        return "Yes, lets make some money";
    } else if (predictedOutcome[1] === mostLikely()) {
        return "Your choise, good odds for a likely outcome";
    } else if (predictedOutcome[1] > ((HowMuchSpend * 2) / 1.3)) {
        return "Your choise, this is a risky but good return";
    } else {
        return "No, don't waste your money";
    }
}
