module.exports = ({
  first_name,
  last_name,
  email,
  phone,
  date_of_birth,
  password
}) => {
  const errors = {};

  // NOTE Validate Form Data
  // if (!first_name) {
  //     errors.push({ message: "First name is required"});
  // }
  // if (!last_name) {
  //     errors.push({ message: "Last name is required"});
  // }

  if (!email) {
    errors["email"] = "Email is required";
  }
  // if (!phone) {
  //     errors.push({ message: "Phone number is required"});
  // }
  // if (!date_of_birth) {
  //     errors.push({ message: "Date of birth is required"});
  // }
  if (!password) {
    errors["password"] = "Please enter your password";
  }

  // NOTE If there is any validation errors, send error status and message
  return {
    errors,
    notValid: Boolean(Object.keys(errors).length)
  };
};
