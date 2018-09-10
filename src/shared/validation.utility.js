export const checkValidity = (value, rules) => {
  let isValid = true;

  if (isValid && rules.required)
    isValid = value.trim() !== '';

  if (isValid && rules.length)
    isValid = value.trim().length === rules.length;

  if (isValid && rules.minLength)
    isValid = value.trim().length >= rules.minLength;

  if (isValid && rules.maxLength)
    isValid = value.trim().length <= rules.maxLength;

  return isValid;
};
