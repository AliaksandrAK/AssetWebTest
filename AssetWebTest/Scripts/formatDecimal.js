/**
 * double_input.js
 * @author: Alex Kusonski
 * @version: 1.0 - 2017-12-07
 *
 * Created by Alex Kusonski
 * Comments: 
 *
 * Copyright (c) ServiceChannel
 *
 */
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
}
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
}
function FormatDecimal(amount) {
    var s = new String();
    s = CurrencyFormatted(amount);
    s = CommaFormatted(s);
    return s;
}