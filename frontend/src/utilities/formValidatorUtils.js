const validateParaLength = (rule, value, callback) => {
  if (value && value.length > 256) {
    callback("Please enter a maximum of 256 characters.");
  } else {
    callback();
  }
};

const validateStringLength = (rule, value, callback) => {
  if (value && (value.length < 6 || value.length > 10)) {
    callback("Please enter a minimum of 6 and maximum of 10 characters.");
  } else {
    callback();
  }
};

export { validateParaLength, validateStringLength };
