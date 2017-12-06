/**
 * double_input.js
 * @author: Alex Kusonski
 * @version: 1.0 - 2017-12-07
 *
 * Created by Alex Kusonski
 *
 * Copyright (c) ServiceChannel
 *
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
function double_input(selector, cel, dec, sep) {

    var keyDown = false, ctrl = 17, vKey = 86, Vkey = 118;

    function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    $(selector).on('keypress', function (e) {
        if (!e) var e = window.event;
        if (e.keyCode > 0 && e.which == 0) return true;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code);
        if (character != sep && !isNumber(character)) return false;
        if (character == '\b' || character == ' ' || character == '\t') return true;

        var val = e.target.value;
        if (character == sep && val.split(sep).length > 1) return false;

        if (keyDown && (code == vKey || code == Vkey)) return (character);
        else {
            if (/[0-9]$/.test(character)) {
                var start = e.target.selectionStart;
                var end = e.target.selectionEnd;
                val = val.replace(val.substring(start, end), "");
                //merge value
                var mergarr = insert(val, start, character).split(sep);
                if (mergarr.length === 1 && mergarr[0].length > cel) return false;
                if (mergarr.length === 2) {
                    if (mergarr[1].length > dec) return false;
                    if (mergarr[0].length > cel) return false;
                }
                if (mergarr.length > 2) return false;
            }
            else false;
        }
    }).on('paste', function (e) {
        var $this = $(this);
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var arr = pastedData.split(sep);
        if (arr.length === 1 && arr[0].length > cel) return false;
        if (arr.length === 2) {
            if (arr[1].length > dec) return false;
            if (arr[0].length > cel) return false;
        }
        if (arr.length > 2) return false;

        //check inside data
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        var val = e.target.value;
        val = val.replace(val.substring(start, end), "");
        //merge value
        var mergeval = insert(val, start, pastedData);
        var mergarr = mergeval.split(sep);
        if (mergarr.length === 1 && mergarr[0].length > cel) return false;
        if (mergarr.length === 2) {
            if (mergarr[1].length > dec) return false;
            if (mergarr[0].length > cel) return false;
        }
        if (mergarr.length > 2) return false;

        setTimeout(function () {
            $this.val($this.val().replace(/[^0-9]/g, ''));
        }, 5);
    });

}