const defaultEmailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

function maskJson(collection, {
  ignoreCase = false,
  replacement = '--REDACTED--'
} = {}) {
  return function (values) {
    console.log(collection, '....XXXXXXXXXXXXXXXXXXXXX>..', values);
    return JSON.stringify(values, maskInfo);

    function maskInfo(key, value) {
      var maskedValue = value;
      if (_.includes(collection, key)) {
        if (value && value.length > 5) {
          if(key === 'email'){
            maskedValue = maskEmail(value);
          }else {
             maskedValue = "***" + maskedValue.substring(value.length - 2, value.length);
          }
        } else {
          maskedValue = "****";
        }
      }
      return maskedValue;
    }


    //   return _.cloneDeepWith(values, (value, key) => {
    //     // Strip matching keys.
    //     if (_.some(collection, item => ignoreCase ? _.toLower(key) === _.toLower(item) : key === item)) {
    //       return replacement;
    //     }

    //     // Allow cloneDeep to recurse into nested objects.
    //     if (_.isObject(value)) {
    //       return;
    //     }
    //     // Otherwise, return the value.
    //     return value;
    //   });
  };
};


function  maskEmail(email) {
  let maskedEmail = '';
  const options =  defaultEmailMaskOptions;
  const indexOfAt = email.indexOf('@');

  if(indexOfAt < 0) return email;

  const [before, after] = email.split('@');
  const beforeLength = before.length;
  const afterLength = after.length;

  maskedEmail += (options.unmaskedStartCharactersBeforeAt >= beforeLength) ? before : 
    before.substr(0, options.unmaskedStartCharactersBeforeAt) + `${options.maskWith}`.repeat(beforeLength - options.unmaskedStartCharactersBeforeAt);
  
  maskedEmail += options.maskAtTheRate ? options.maskWith : '@';

  maskedEmail += (options.unmaskedEndCharactersAfterAt >= afterLength) ? after : 
    (`${options.maskWith}`.repeat(afterLength-options.unmaskedEndCharactersAfterAt) + after.substr(afterLength - options.unmaskedEndCharactersAfterAt));
  return maskedEmail;
}