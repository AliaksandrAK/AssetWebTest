
//String Prototypes
String.Empty = "";
var StringComparison =
{
    OriginalCase: 1,
    IgnoreCase: 2
};
String.IsNullOrEmpty = function (value) {
    return value == null || value == undefined || value.toString().Equals(String.Empty);
}
String.prototype.ToString = function () {
    return this.toString();
}
String.prototype.IsInArray = function (array) {
    return array.Contains(this);
}
String.prototype.Equals = function (value) {
    return this == String(value);
}
String.prototype.ToLower = function () {
    return this.toLowerCase();
}
String.prototype.ToUpper = function () {
    return this.toUpperCase();
}
String.Compare = function (value1, value2, stringComparison) {
    if (String.IsNullOrEmpty(stringComparison)) {
        var stringComparison = StringComparison.OriginalCase;
    }
    switch (stringComparison) {
        case StringComparison.IgnoreCase:
            return value1.ToLower().Equals(value2.ToLower());
        default:
            return value1.Equals(value2);
    }
}
String.Format = function (value, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    if (String.IsNullOrEmpty(value))
        return String.Empty;

    if (arg0 != null) {
        value = value.Replace("{0}", arg0);
    }
    if (arg1 != null) {
        value = value.Replace("{1}", arg1);
    }
    if (arg2 != null) {
        value = value.Replace("{2}", arg2);
    }
    if (arg3 != null) {
        value = value.Replace("{3}", arg3);
    }
    if (arg4 != null) {
        value = value.Replace("{4}", arg4);
    }
    if (arg5 != null) {
        value = value.Replace("{5}", arg5);
    }
    if (arg6 != null) {
        value = value.Replace("{6}", arg6);
    }
    if (arg7 != null) {
        value = value.Replace("{7}", arg7);
    }

    return value;
}

String.prototype.Replace = function (search, replace) {
    return this.split(search).join(replace);
}

String.prototype.Trim = function (value) {
    return value.replace(/(^\s+)|(\s+$)/g, "");
}

String.prototype.Contains = function (value) {
    return (this.ToLower().indexOf(value.ToLower()) > -1);
}


Number.prototype.Equals = function (value) {
    return this == value;
}
Number.prototype.IsNegative = function () {
    return this < 0;
}

Boolean.prototype.Equals = function (value) {
    return this == value;
}



//Array Prototypes
Array.IsArray = function (array) {
    return (array.length > 0);
}
Array.prototype.Count = function () {
    return this.length;
}
Array.prototype.IsNullOrEmtry = function () {
    return this == null || this == undefined || this.Count() < 1;
}
Array.prototype.Add = function (value) {
    this.push(value);
    return this;
}
Array.prototype.Remove = function (value) {
    var array = new Array();
    if (typeof (value) == 'function') {
        for (var i = 0; i < this.Count(); i++) {
            if (!value(this[i]))
                array.Add(this[i]);
        }
    }
    else {
        for (var i = 0; i < this.Count(); i++) {
            if (!this[i].Equals(value)) {
                array.Add(this[i]);
            }
        }
    }

    this.Clear();

    for (var i = 0; i < array.Count(); i++) {
        this.Add(array[i]);
    }
}
Array.prototype.Clear = function () {
    this.length = 0;
}
Array.prototype.Single = function (func) {
    if (func) {
        for (var i = 0; i < this.length; i++) {
            if (func(this[i]))
                return this[i];
        }
    }
    else {
        return this.First();
    }

}
Array.prototype.First = function () {
    return this.Count() > 0 ? this[0] : null;
}
Array.prototype.Last = function () {
    return this[this.Count() - 1];
}
Array.prototype.Contains = function (item, propName) {
    var res = false;
    this.ForEach(function (x) {
        var val = propName ? String(x[propName]) : String(x);
        if (item.Equals(val))
            res = true;
    });

    return res;
}
Array.prototype.Skip = function (count) {
    return this.slice(count);
}
Array.prototype.Take = function (count) {
    var array = new Array();
    if (count > this.Count()) {
        count = this.Count();
    }
    this.ForEach(function (x) {
        array.Add(i);
    });

    return array;
}
Array.prototype.Reverse = function () {
    return this.reverse();
}

Array.prototype.Any = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            return true;
        }
    }

    return false;
}

Array.prototype.Where = function (func) {
    var array = new Array();
    this.ForEach(function (x) {
        if (func(x))
            array.Add(x);
    });

    return array;
}

Array.prototype.ForEach = function (func) {
    var array = new Array();
    for (var i = 0; i < this.Count(); i++) {
        func(this[i], i);
    }
}

Array.prototype.RemoveAll = function (func) {
    var array = new Array();
    this.ForEach(function (x) {
        if (!func(x)) {
            array.Add(x);
        }
    });

    return array;
}

Array.prototype.Except = function (array) {
    var res = new Array();
    if (!array.IsNullOrEmtry()) {
        for (var i = 0; i < this.Count(); i++) {
            if (!array.Contains(this[i])) {
                res.Add(this[i]);
            }
        }
    }

    return res;
}

Array.prototype.OrderBy = function (func) {
    var currentArray = new Array();
    var orderByArray = new Array();
    var resultArray = new Array();
    this.ForEach(function (x) {
        orderByArray.Add(func(x));
    });
    orderByArray.sort();
    orderByArray.ForEach(function (z) {
        var elem = currentArray.Where(function (y) {
            return func(y).Equals(z);
        }).Single();
        alert(elem);
        resultArray.Add(elem);
    });

    return resultArray;
}

Array.prototype.ToString = function () {
    return this.toString();
}

function StringBuilder(value) {
    this.strings = new Array(string.Empty);
    this.Append(value);
}

StringBuilder.prototype.Append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.AppendLine = function (value) {
    var br = "<br />";
    this.strings.push(value ? value + br : br);
}

StringBuilder.prototype.Clear = function () {
    this.strings.length = 0;
}

StringBuilder.prototype.AppendFormat = function (value, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    if (String.IsNullOrEmpty(value))
        return;

    if (arg0 != null) {
        value = value.Replace("{0}", arg0);
    }
    if (arg1 != null) {
        value = value.Replace("{1}", arg1);
    }
    if (arg2 != null) {
        value = value.Replace("{2}", arg2);
    }
    if (arg3 != null) {
        value = value.Replace("{3}", arg3);
    }
    if (arg4 != null) {
        value = value.Replace("{4}", arg4);
    }
    if (arg5 != null) {
        value = value.Replace("{5}", arg5);
    }
    if (arg6 != null) {
        value = value.Replace("{6}", arg6);
    }
    if (arg7 != null) {
        value = value.Replace("{7}", arg7);
    }

    this.Append(value);
}

window.Util = {

    // create namespace [Function]:
    // creates a namespace
    createNamespace: function (ns) {
        // First split the namespace string separating each level of the namespace object.
        var splitNs = ns.split(".");
        // Define a string, which will hold the name of the object 
        // we are currently working with. Initialize to the first part.
        var builtNs = splitNs[0];
        var i, base = window;
        for (i = 0; i < splitNs.length; i++) {
            if (typeof (base[splitNs[i]]) == "undefined") base[splitNs[i]] = {};
            base = base[splitNs[i]];
        }
        return base; // Return the namespace as an object.
    }
}

StringBuilder.prototype.ToString = function () {
    return this.strings.join("");
}

var string = String;
