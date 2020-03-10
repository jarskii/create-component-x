const isNumber =  (value) => !isNaN(Number(value));

export default function flatten(input, reference = '', output = []) {
  Object.keys(input).forEach(function(key) {
    const value = input[key];

    if (key) {
      let slash = reference ? '/' : '';
      let keyPart = isNumber(key) ? '' : slash + key
      key = reference  + keyPart;
    }

    if (typeof value === 'object' && value !== null) {
      flatten(value, key, output);
    } else {
      output.push(`${key.length ? ( key + '/' ) : '' }${value}`);
    }
  });

  return output;
}
