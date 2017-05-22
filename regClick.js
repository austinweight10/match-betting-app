import $ from 'jquery';
import {MB} from "./matchbetting.js";
import {collecResults} from "./saveRes.js";

// change to react
// initiate click for collecting results
$('.MB__input__con__store').on("click", function() {
    var parent = $(this).parents().find(".MB__recomendations");
     collecResults(parent);
});
