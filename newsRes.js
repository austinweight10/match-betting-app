// need to build
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import jsonSport from "./en.2017.json";

let match = jsonSport.rounds.length - 29;

export function newsLookUp(match, func = 'both') {

    function more(match) {
        $(".MB__sport-res__next-season").one('click', function() {
            if (match < 38) {
                match = match + 1;
                newsLookUp(match, 'next');
            }
        });
    }

    function less(match) {
        $(".MB__sport-res__last-season").one('click', function() {
            if (match > 0) {
                match = match - 1;
                newsLookUp(match, 'less');
            }
        });
    }

    if (func === 'more') {
        more(match);
    } else if (func === 'less') {
        less(match);
    } else {
        more(match);
        less(match);
    }

    (() => {

        let sportsDataArray = [],
            round,
            played = '(has been played)';

        (() => {
            jsonSport.rounds[match].matches.map((x) => {
                let theScore1;
                let theScore2;

                (function () {
                    if (x.score1 === null) {
                        theScore1 = ' ';
                        played = '(being played or to played)';
                    } else {
                         theScore1 = ' ' + x.score1 + ' ';
                    };
                    if (x.score2 === null) {
                        theScore2 = ' ';
                    } else {
                         theScore2 = ' ' +  x.score2 + ' ' ;
                    };
                })();

                round = 'Round ' + match + ' ' + played;

                sportsDataArray.push(x.team1.name);
                sportsDataArray.push(theScore1);
                sportsDataArray.push(' vs ');
                sportsDataArray.push(x.team2.name);
                sportsDataArray.push(theScore2);
                sportsDataArray.push('  |  ');
            })
        })();

          ReactDOM.render(<div><span>{round}</span></div>,
               document.getElementById('MB__sport-res__rounds'));

          ReactDOM.render(<div><span>{sportsDataArray}</span></div>,
               document.getElementById('MB__sport-res'));

      })();

};

newsLookUp(match);
