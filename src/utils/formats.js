import moment from 'moment';

// Format Datetime
export const formatDatetime = ({
  date,
  sourceFormat,
  targetFormat
}) => {
  let _date = moment(date, sourceFormat).format(targetFormat);
  return _date;
}

// String
export const string = (value) => value.toString();

// Number Formats
export const numberFormats = {
  // Integer
  integer: (value) => parseInt(removeCommas(value)),

  // Integer Formatted
  integerFormatted: ({
    value,
    decPoint = '.',
    thousandsSep = ','
  }) => smart_number_format(parseInt(removeCommas(value)), 0, decPoint, thousandsSep),

  // Integer Colored
  integerColored: (value) => {
    const newValue = parseInt(removeCommas(value));
    return colored(newValue, value);
  },

  // Integer Formatted Colored
  integerFormattedColored: ({ value, decPoint = '.', thousandsSep = ',' }) => {
    const newValue = smart_number_format(parseInt(removeCommas(value)), 0, decPoint, thousandsSep);
    return colored(newValue, value);
  },

  // Float
  float: (value) => parseFloat(removeCommas(value)),

  // Float Formatted
  floatFormatted: ({
    value,
    decimals = 8,
    decPoint = '.',
    thousandsSep = ','
  }) => smart_number_format(parseFloat(removeCommas(value)), decimals, decPoint, thousandsSep),

  // Float Colored
  floatColored: ({ value, decimals = 8, decPoint = '.' }) => {
    const newValue = smart_number_format(parseFloat(removeCommas(value)), decimals, decPoint, "");
    return colored(newValue, value);
  },

  // Float Colored Formatted
  floatColoredFormatted: ({
    value,
    decimals = 8,
    decPoint = '.',
    thousandsSep = ','
  }) => {
    const newValue = smart_number_format(parseFloat(removeCommas(value)), decimals, decPoint, thousandsSep);
    return colored(newValue, value);
  }
};

export function smart_number_format(
  number,
  decimals = 8,
  dec_point = '.',
  thousands_sep = ',',
  remove_trailing_zeros
) {
  number = Number(removeCommas(number));
  decimals = Number(decimals);

  if (typeof remove_trailing_zeros == "undefined")
    remove_trailing_zeros = false;

  if (decimals < 0) return number;

  var out1 = parseFloat(number_format(number, 8, dec_point, "") + 0.0);

  var out2 = number_format(out1, decimals, dec_point, thousands_sep, "");

  let returnData = null;

  if (out1 !== out2) {
    if (decimals === 0)
      return number_format(out1, decimals, dec_point, thousands_sep);

    returnData = number_format(out1, decimals, dec_point, thousands_sep).rtrim(
      "0"
    );

    let returnDataSchema = returnData.split(".");
    if (returnDataSchema.length === 2) {
      returnData = returnDataSchema[0];
      if (returnDataSchema[1].length === 0) {
        returnData += ".00";
      } else if (returnDataSchema[1].length === 1) {
        returnData += "." + returnDataSchema[1] + "0";
      } else {
        returnData += "." + returnDataSchema[1];
      }
    }

    return returnData;
  }

  if (decimals === 0)
    return number_format(out2, decimals, dec_point, thousands_sep);

  returnData = number_format(out2, decimals, dec_point, thousands_sep).rtrim(
    "0"
  );

  if (remove_trailing_zeros) {
    let returnDataSchema = returnData.split(".");
    if (returnDataSchema.length === 2 && returnDataSchema[1] !== "") {
      return returnData;
    } else if (returnDataSchema.length === 2 && returnDataSchema[1] === "") {
      return returnData.rtrim(".");
    }
  }

  var returnDataSchema = returnData.split(".");
  if (returnDataSchema.length === 2) {
    returnData = returnDataSchema[0];
    if (returnDataSchema[1].length === 0) {
      returnData += ".00";
    } else if (returnDataSchema[1].length === 1) {
      returnData += "." + returnDataSchema[1] + "0";
    } else {
      returnData += "." + returnDataSchema[1];
    }
  }
  return returnData;
}

function number_format(number, decimals, dec_point, thousands_sep) {
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function colored(newValue, value) {
  return Number(value) === 0
    ? <span className="price-neutral">{newValue}</span>
    : value < 0
      ? <span className="price-down">{newValue}</span>
      : <span className="price-up">{newValue}</span>;
}

// eslint-disable-next-line no-extend-native
String.prototype.rtrim = function (s) {
  if (s === undefined) s = "\\s";
  return this.replace(new RegExp("[" + s + "]*$"), "");
};
// eslint-disable-next-line no-extend-native
String.prototype.ltrim = function (s) {
  if (s === undefined) s = "\\s";
  return this.replace(new RegExp("^[" + s + "]*"), "");
};

function removeCommas(val) {
  return String(val).replaceAll(',', '')
}
