// need to build
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import jsonSport from "./en.2017.json";

export function newsLookUp() {

    var matches = jsonSport.rounds.length;

    (() => {

        let sportsDataArray = [];
        (() => {
            jsonSport.rounds[matches - 1].matches.map((x) => {
                sportsDataArray.push(x.team1.name);
                sportsDataArray.push(x.score1);
                sportsDataArray.push(' vs ')
                sportsDataArray.push(x.team2.name);
                sportsDataArray.push(x.score2 + '  |  ');
            })
        })();
        // console.log(sportsDataArray)
          ReactDOM.render(<div>{sportsDataArray}</div>,
               document.getElementById('MB__sport-res'));

      })();

    // this will relly on consistant data format
    var twitterResults = function() {
        var data = ""; // add twitter data here
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
};

newsLookUp();
