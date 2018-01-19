/**
 * double_input.js
 * @author: Alex Kusonski
 * @version: 1.0 - 2017-12-07
 *
 * Created by Alex Kusonski
 * Comments: When paste data from clipboard there is not checking to put only number (it is not correct).
 * It is because old version for the input item work the same and client should see the same in new version.
 *
 * Copyright (c) ServiceChannel
 *
 */
function double_input(selector, cel, dec, callbackfunc) {
    var sep = ".";
    var symbolTh = /,/g;
    var symbolMinus = "-";

    function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function removeStr(str, startIndex, count) {
        return str.substr(0, startIndex) + str.substr(startIndex + count);
    }
    function cutValue(value) {
        if (string.IsNullOrEmpty(value) || value.Equals(symbolMinus)) return value;
        value = value.replace(symbolTh, "");
        var arr = value.split(sep);
        var cutstring = "";
        if (arr.length > 0) {
            var isminus = 0;
            if (arr[0].indexOf(symbolMinus) != -1)isminus = 1;
            if ((arr[0].length-isminus) > cel) {
                arr[0] = arr[0].substring(0, (cel+isminus));
                cutstring = arr[0];
            }
            else if (arr.length === 1) {
                cutstring = arr[0] + sep;
            }
            else if (arr.length === 2) {
                if (arr[1].length > dec) arr[1] = arr[1].substring(1, dec + 1);
                cutstring = arr[0] + sep + arr[1];
            }
        }
        return cutstring;
    }
    function checkValue(newval) {
        var mergarr = newval.split(sep);
        if (mergarr.length > 0) {
            mergarr[0] = mergarr[0].replace(symbolTh, "");
            var idxminus = mergarr[0].match(/-/g);
            if ((idxminus != null && idxminus.length > 1) ||
                mergarr[0].indexOf(symbolMinus) > 0)return false;
            mergarr[0] = mergarr[0].replace("-", "");
        }
        if (mergarr.length === 1 && mergarr[0].length > cel) return false;
        if (mergarr.length === 2) {
            if (mergarr[0].length > cel) return false;
            if (mergarr[1].length > dec) return false;
        }
        if (mergarr.length > 2) return false;
    }

    $(selector).bind('keypress', function (e) {
        if (!e) var e = window.event;
        if (e.keyCode > 0 && e.which == 0) return true;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code);
        if (character != sep && !isNumber(character) && character != symbolMinus) return false;
        if (character == '\b' || character == ' ' || character == '\t') return true;

        var val = e.target.value;
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;

        if (/[0-9]$/.test(character) || character == sep || character == symbolMinus) {
            val = removeStr(val, start, end - start);
            var newval = insert(val, start, character);
            return checkValue(newval);
        }
    });
    $(selector).bind('paste', function (e) {
        var result = true;
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        var val = e.target.value;
        var pastedData = "";
        if(window.clipboardData) { //for IE
            pastedData = window.clipboardData.getData('Text');
        }else {
            pastedData = e.originalEvent.clipboardData.getData('text');
        }
        val = removeStr(val, start, end-start);

        if (string.IsNullOrEmpty(val) || val.Equals(symbolMinus)) {
            $(this).val(cutValue(pastedData));
            if (callbackfunc != null) callbackfunc($(this));
            result = false;
        }
        else {
            var newval = insert(val, start, pastedData);
            result = checkValue(newval);
         }
        return result;
    });

    $(selector).bind('blur', function (e) {
        var value = $(this).val();
        if (string.IsNullOrEmpty(value) || value.Equals("-")) {
            return true;
        }
        $(this).val(cutValue(value));
        if (callbackfunc != null) callbackfunc($(this));
    });
}

function double_input_unbind(selector) {
    $(selector).unbind("keypress");
    $(selector).unbind("paste");
    $(selector).unbind("blur");
}