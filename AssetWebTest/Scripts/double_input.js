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
                    mergarr[0] = mergarr[0].replace(",","");
                    if (mergarr[0].length > cel) return false;
                    if (mergarr[1].length > dec) return false;
                }
                if (mergarr.length > 2) return false;
            }
        }
    }).on('paste', function (e) {
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
        val = val.replace(val.substring(start, end), "");

        if (string.IsNullOrEmpty(val) || val.Equals("-"))
        {
            var cutstring = "";
            if (arr.length > 0) 
            {
                if (arr[0].length > cel) 
                {
                    arr[0] = arr[0].substring(1, cel+1);
                    cutstring = arr[0] + sep;
                }
                else if (arr.length === 1)
                {
                    cutstring = arr[0] + sep;
                }
                else if (arr.length === 2)
                {
                    if (arr[1].length > dec) arr[1] = arr[1].substring(1, dec+1);
                    cutstring = arr[0] + sep + arr[1];
                } 
            }
            var formatedValue = FormatDecimal(cutstring);
            $(this).val(formatedValue);
            return false;
        }
       
        //merge value and check
        var mergeval = insert(val, start, pastedData);
        var mergarr = mergeval.split(sep);
        if (mergarr.length === 1 && mergarr[0].length > cel) return false;
        if (mergarr.length === 2) {
            mergarr[0] = mergarr[0].replace(",","");
            if (mergarr[0].length > cel) return false;
            if (mergarr[1].length > dec) return false;
        }
        if (mergarr.length > 2) return false;

        setTimeout(function () {
            $this.val($this.val().replace(/[^0-9]/g, ''));
        }, 5);
    }).on('blur', function (e) {
        var value = $(this).val();
        if (string.IsNullOrEmpty(value) || value.Equals("-")) {
            return true;
        }

        var formatedValue = FormatDecimal(value);
        $(this).val(formatedValue);
    });

    $(document).keydown(function (e) {
        if (e.keyCode == ctrl) keyDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrl) keyDown = false;
    });

    function prepareFloat(_float) {
        while (_float.toString().indexOf(',') > 0) {
            _float = _float.toString().replace(",", "");
        }
        return _float;
    }

    function CurrencyFormatted(amount) {
        amount = prepareFloat(amount);
        var i = parseFloat(amount);
        if (isNaN(i)) { i = 0.00; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        s = new String(i);
        if (s.indexOf('.') < 0) { s += '.00'; }
        if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        return s;
    } // function CurrencyFormatted()

    function CommaFormatted(amount) {
        var delimiter = ",";
        var a = amount.split('.', 2);
        var d = a[1];
        var i = parseInt(a[0]);
        if (isNaN(i)) { return ''; }
        var minus = '';
        if (i < 0 || amount.indexOf('-') == 0) { minus = '-'; }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while (n.length > 3) {
            var nn = n.substr(n.length - 3);
            a.unshift(nn);
            n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if (d.length < 1) { amount = n; }
        else { amount = n + '.' + d; }
        amount = minus + amount;
        return amount;
    } // function CommaFormatted()

    function FormatDecimal(amount) {
        var s = new String();
        s = CurrencyFormatted(amount);
        s = CommaFormatted(s);
        return s;
    }
}