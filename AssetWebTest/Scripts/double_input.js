/**
 * double_input.js
 * @author: Alex Kusonski
 * @version: 1.0 - 2017-12-07
 *
 * Created by Alex Kusonski
 *
 * Copyright (c) ServiceChannel
 *
 */
function double_input(selector, cel, dec) {
    var sep = ".";
    var symbolTh = ",";
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

    $(selector).bind('keypress', function (e) {
        if (!e) var e = window.event;
        if (e.keyCode > 0 && e.which == 0) return true;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code);
        if (character != sep && !isNumber(character)) return false;
        if (character == '\b' || character == ' ' || character == '\t') return true;

        var val = e.target.value;
        if (character == sep && val.split(sep).length > 1) return false;

        if (/[0-9]$/.test(character)) {
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            val = removeStr(val,start, end-start);
            var mergarr = insert(val, start, character).split(sep);
            if (mergarr.length === 1 && mergarr[0].length > cel) return false;
            if (mergarr.length === 2) {
                mergarr[0] = mergarr[0].replace(symbolTh, "");
                if (mergarr[0].length > cel) return false;
                if (mergarr[1].length > dec) return false;
            }
            if (mergarr.length > 2) return false;
        }
    });
    $(selector).bind('paste', function (e) {
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        var val = e.target.value;
        var pastedData = "";
        if(window.clipboardData) { //for IE
            pastedData = window.clipboardData.getData('Text');
        }else {
            pastedData = e.originalEvent.clipboardData.getData('text');
        }
        var arr = pastedData.split(sep);
        val = removeStr(val, start, end-start);

        if (string.IsNullOrEmpty(val) || val.Equals(symbolMinus)) {
            var cutstring = "";
            if (arr.length > 0) {
                if (arr[0].length > cel) {
                    arr[0] = arr[0].substring(0, cel);
                    cutstring = arr[0] + sep;
                }
                else if (arr.length === 1) {
                    cutstring = arr[0] + sep;
                }
                else if (arr.length === 2) {
                    if (arr[1].length > dec) arr[1] = arr[1].substring(1, dec+1);
                    cutstring = arr[0] + sep + arr[1];
                } 
            }
            return true;
        }
        var mergeval = insert(val, start, pastedData);
        var mergarr = mergeval.split(sep);
        if (mergarr.length === 1 && mergarr[0].length > cel) return false;
        if (mergarr.length === 2) {
            mergarr[0] = mergarr[0].replace(symbolTh, "");
            if (mergarr[0].length > cel) return false;
            if (mergarr[1].length > dec) return false;
        }
        if (mergarr.length > 2) return false;
    });
}

function double_input_unbind(selector) {
    $(selector).unbind("keypress");
    $(selector).unbind("paste");
}