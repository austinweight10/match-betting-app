// --------------------- Next features ---------------------

// allow editing of results once saved
// save processed results that are not saved too db in a cookie so when open autofill if you leave page
// create logins - allows more that 5 tests - count how many tests in a cookie

// --------------------- Next features ---------------------

// build using react need to add react
// move functions into differnet files and import

// import React from 'react';
// import ReactDOM from 'react-dom';
//
// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );

import $ from 'jquery';
import json from "./matchbetting.json";

// can be removed
$(".MB__input__first-bet").val("2/1");
$(".MB__input__second-bet").val("3/1");
$(".MB__input__third-bet").val("1/2");
$(".MB__input__ammount-bet").val("900");

(function() {

    // render previous results on load
    // update to react so when more are stored updates
    function previousResults() {

        // url variable
        var pastData = "",
            path = json, // will need to update on host
            previousResultsJsonpath = path + "matchbetting.json";

        // get past results function
        var previousResultsJson = (function () {

            // get JSON handeled in webpack
            // $.getJSON(previousResultsJsonpath, function(data) {
            //      pastData = data;
                 pastData = json;

                 // turn data into array
                 var previousResultsArray = Object.keys(pastData).map(function(e) {
                     return [Number(e), pastData[e]];
                 });

                //  create object for each past result
                 var prevresults = previousResultsArray.map(function(i) {
                     var prevresults = '<div class="MB__prev-res__res"><span>The odds</span><span>Number 1:' + i[1].odds1 + '</span><span>Number 2:' + i[1].odds2 + '</span><span>Number 3:'  + i[1].odds3 + '</span><span>How much was bet:'  + i[1].amountBet + '<span><span>What was recomended:'  + i[1].RecomendedBet + '<span><span>The amounts bet</span><span>Number 1:' + i[1].finalBet1 + '</span><span>Number 2:' + i[1].finalBet2 + '</span><span>Number 3:' + i[1].fianlBet3 + '</span><span>The Returns</span><span>Results 1:'  + i[1].finalPayout1 + '</span><span>Results 2:'  + i[1].finalPayout2 + '</span><span>Results 3:' + i[1].fianlPayout3 + '</span></div>';
                     return prevresults;
                 });

                 // append results
                 $(".MB__prev-res").append(prevresults);

            // });

        })();


        // read mmore function prev results
        function readmore() {
            // show more prev on click
            $(".MB__prev-res__read-more").one("click", function() {
                $(".MB__prev-res").addClass("MB__prev-res--open");
                $(".MB__prev-res__read-more").text("hide");
                $(".MB__prev-res__read-more").one("click", function() {
                    $(".MB__prev-res").removeClass("MB__prev-res--open");
                    $(".MB__prev-res__read-more").text("read more");
                    readmore();
                });
            });
        }
        readmore();
    }

    // output prev results
    previousResults();


    // generic functions

    // turn fractions into presentages num to 100
    var makePersentage = function(makePersentage) {
        var makeString = makePersentage,
            split = makeString.split('/'),
            result = parseInt(split[0], 10) / parseInt(split[1], 10),
            persentage = Math.floor(result * 100);
            return persentage;
    };


    // best outcome
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

    // whet we think the winnings will be
    // to build
    var prdictedWinnings = function(first, second, third, newspredict, firstAmmount, secondAmmount, thirdAmmount) {
        // most probable outcome based on news and persntages * amount recomended
        var bestOut = bestPosOutome(first, second, third);
        var newsPred = newspredict;

        function checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount) {
            // check whoever wins we do not lose loads/anything
            var one = first * firstAmmount;
            var two = second * secondAmmount;
            var three = third * thirdAmmount;
            var persentageLessAllowed = ""; // as num not persentag
            // check if how far all of these are off the orignal spend by persentage and make sure fav is over
            if (one < persentageLessAllowed || two < persentageLessAllowed || three < persentageLessAllowed) {
                return false;
            } else {
                return true;
            }
        }

        // this needs to influence whats recomended
        if (checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount) && (((newsPred * amountToBet) >= firstAmmount) && ((newsPred * amountToBet) >= secondAmmount) && ((newsPred * amountToBet) >= thirdAmmount))) {
            // good
            return true;
        } else if ((bestOut === news) && checkDefasit(first, second, third, firstAmmount, secondAmmount, thirdAmmount)) {
            // safyiish
            return true;
        } else if ((bestOut === news) && (((newsPred * amountToBet) >= firstAmmount) && ((newsPred * amountToBet) >= secondAmmount) && ((newsPred * amountToBet) >= thirdAmmount))) {
            // risky
            return true;
        } else {
            return false;
        }
    };

    function MB(FirstBet, SecondBet, ThirdBet, HowMuch) {

        // selctors reused
        var firstBet = $(".MB__input__first-bet").val(),
            secondBet = $(".MB__input__second-bet").val(),
            thirdBet = $(".MB__input__third-bet").val(),
            HowMuchSpend = $(".MB__input__ammount-bet").val();

        (function() {

            // amounts devided by three
            var thirdHowMUchToSpend = HowMuchSpend/3,
                firstBetAmount = thirdHowMUchToSpend,
                secondBetAmount = thirdHowMUchToSpend,
                thirdBetAmount = thirdHowMUchToSpend;

            // make persenatges
            var firstBetPersentage = makePersentage(firstBet),
                secondBetPersentage = makePersentage(secondBet),
                thirdBetPersentage = makePersentage(thirdBet);

            // total of all persentages to devid by
            var total = firstBetPersentage + secondBetPersentage + thirdBetPersentage;

            // how to slit the money
            var moneySplit = firstBetPersentage + secondBetPersentage + thirdBetPersentage,
                firstPersentage = (firstBetPersentage / total) * 100,
                secondPersentage = (secondBetPersentage / total) * 100,
                thirdPersentage = (thirdBetPersentage / total) * 100;

            // persentage for each
            function howMuchForEach(amount, persentage) {
                var increace = amount * persentage,
                    divide = increace / 100,
                    result =  Math.floor(divide);
                    return divide;
            }

            // how much for each application
            var firstAmmount = howMuchForEach(HowMuchSpend, firstPersentage),
                secondAmmount = howMuchForEach(HowMuchSpend, secondPersentage),
                thirdAmmount = howMuchForEach(HowMuchSpend, thirdPersentage);

            // build recusive function for weighting based on odds / if lots more ned to mirror

            // take into account news and external sources - predictions twitter / sports predictions / previous results / these can then be appended to to bar as a live stream it will only select relivant - should have links
            // football learning system - allows us to know who performs consistantly and who doesn't and change results accordingly also allow for peaks and lows - will need to know which teams are being bet on for this - mabye future feature

            // need to build
            var newsLookUp = function() {
                // import twitter api json
                // scan sports sites json
                // this will rely on consistant data format
                var twitterResults = function() {
                    var data = ""; // add twitter data here
                    var HowMuchSpend = $(".MB__input__name-of-event").val();
                    var matchName = ""; // regex to match name
                    var getExraInfo = function(pasreData) {  // split useful info
                        var data = pasreData;
                        // build for map function
                        data.map();
                    }; // extar info
                    getExraInfo = getExraInfo(matchName);
                    var transformToHTML = "<div><span>" + getExraInfo + "</span></div>";
                    // need to add to dom
                    $(".MB__input__name").appned();
                };

                var aFunctionForNewsSites = function() {
                    var newsdata = "",
                        newsdata = toArray(newsdata),
                        interesting = function() {
                            return;
                        };
                    // use a map function here
                    function ifAnythingInteresting() {
                        for (var i = 0; i < newsdata.length; i++) {
                            if (newsdata[i] === interesting) {
                                newsdata[i]
                            }
                        }
                    }
                };
                // needs to have a way of identifying even if its just that the fractions are the same
                return predictedWinned;
            };

            // is bet good function - waiting on/needs to take into account prdictedWinnings
            var shouldYouBet = function() {
                var predictedOutcome = (prdictedWinnings(firstBetPersentage, secondBetPersentage, thirdBetPersentage, newsLookUp(), firstAmmount, secondAmmount, thirdAmmount) * (bestPosOutome(firstAmmount, secondAmmount, thirdAmmount))),
                    bestOutCome = (bestPosOutome(firstBetPersentage, secondBetPersentage, thirdBetPersentage)) * (bestPosOutome(firstAmmount, secondAmmount, thirdAmmount));

                // is it safe to bet garanteed win?
                if (predictedOutcome) {
                    return 'No';
                // will the returns be worth it?
                } else if (bestOutCome > ((HowMuchSpend * 2) / 1.3)) {
                    return 'Would advise against';
                } else {
                    return 'Yes go for it';
                }
            };

            // results made into numbers
            var firstBetResult = Math.round(firstAmmount * 100) / 100,
                secondBetResult = Math.round(secondAmmount * 100) / 100,
                thirdBetResult = Math.round(thirdAmmount * 100) / 100,
                isItRight = shouldYouBet();

            // results for bet
            function finalResult(first, second, third, isItRight) {

                // rmove errors
                function removeErrors() {
                    $(".errorEmpty").remove();
                    $(".errorNaN").remove();
                }

                // if inputs are empty
                function errorempty() {
                    if ($(".errorEmpty").hasClass("errorEmpty")) {
                        removeErrors();
                        $(".MB__input").after('<div class="errorEmpty">this is still empty</div>');
                    } else {
                        removeErrors();
                        $(".MB__input").after('<div class="errorEmpty">this is empty</div>');
                    }
                }

                // if inputs are not numbers
                function errorNAN() {
                    if ($(".errorNaN").hasClass("errorNaN")) {
                        removeErrors();
                        $(".MB__input").after('<div class="errorNaN">this is still not a number</div>');
                    } else {
                        removeErrors();
                        $(".MB__input").after('<div class="errorNaN">this is not a number</div>');
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

                // append results
                $(".MB__recomendations").append('<span>The odds</span><span>Number 1:<span class="MB__fraction__one">' + firstBet + '</span></span><span>Number 2:<span class="MB__fraction__two">' + secondBet +'</span></span><span>Number 3:<span class="MB__fraction__three">' + thirdBet +'</span</span><span>What the recomended bet is:' + isItRight + '<span><span>Number 1:<span class="MB__ammount__one">' + first + '</span></span><span>Number 2:<span class="MB__ammount__two">' + second + '</span></span><span>Number 3:<span class="MB__ammount__three">' + third + '</span></span><span>the results<span><div class="MB__input__con"><input class="MB__input__con__first"></input><input class="MB__input__con__second"></input><input class="MB__input__con__third"></input><span class="MB__input__con__store">store results<span></div>');
            }

            // run function
            var theResult = finalResult(firstBetResult, secondBetResult, thirdBetResult, isItRight);
            // return append and results
            return theResult;

        })();
    }

    // run function for match betting initiated after click
    $(".MB__input__submit").on("click", function() {
        // match bet function
        MB();

        // to remove
        $(".MB__input__con__first").val("yes");
        $(".MB__input__con__second").val("no");
        $(".MB__input__con__third").val("no");

        // initiate click for collecting results
        $('.MB__input__con__store').on("click", function() {
            var parent = $(this).parents().find(".MB__recomendations");
             collecResults(parent);
        });
    });

    // collect reults
    function collecResults(parent) {

        // get resu;ts from dom
        var firstResult = parent.find(".MB__input__con__first").val(), // need to make sepcific to each result
            secondResult = parent.find(".MB__input__con__second").val(), // need to make sepcific to each result
            thirdResult = parent.find(".MB__input__con__third").val(), // need to make sepcific to each result
            fractionOne = parent.find(".MB__fraction__one").text(), // need to make sepcific to each result
            fractionTwo = parent.find(".MB__fraction__two").text(), // need to make sepcific to each result
            fractionThree = parent.find(".MB__fraction__three").text(),
            ammountBetOne = parent.find(".MB__ammount__one").text(),
            ammountBetTwo = parent.find(".MB__ammount__two").text(),
            ammountBetThree = parent.find(".MB__ammount__three").text(); // need to make sepcific to each result

        // make fractions persentages
        fractionOne = makePersentage(fractionOne);
        fractionTwo = makePersentage(fractionTwo);
        fractionThree = makePersentage(fractionThree);

        // is correct? yes / no
        function anountReturned(result, fraction, amount) {
            if (result === "yes" || result === "Yes" || result === "correct" || result === "YES") {
                return fraction * amount;
            } else {
                return 0;
            }
        }

        // check how much for each
        firstResultFinal = anountReturned(firstResult, fractionOne, ammountBetOne);
        secondResultFinal = anountReturned(secondResult, fractionTwo, ammountBetTwo);
        thirdResultFinal = anountReturned(thirdResult, fractionThree, ammountBetThree);

        // check results no empty
        if (firstResult !== "" && secondResult !== "" && thirdResult !== "") {

            // add to json
            // needs building this will require node
            addToDatabase = (function() {
                var jsonToAppend = firstResultFinal + "," + secondResultFinal + "," + thirdResultFinal,
                    winnings = firstResultFinal + secondResultFinal + thirdResultFinal;
                console.log(jsonToAppend);
                // add to database function here
            })(); // add results to json
        }
    }

})();
