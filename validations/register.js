module.exports = ({ first_name, last_name, username, email, phone, date_of_birth, password, password2 }) => {
    const errors = [];

    // NOTE Validate Form Data
    if (!first_name) {
        errors.push({ message: "First name is required"});
    }
    if (!last_name) {
        errors.push({ message: "Last name is required"});
    }
    if (!username) {
        errors.push({ message: "Username is required"});
    }
    if (!email) {
        errors.push({ message: "Email is required"});
    }
    if (!phone) {
        errors.push({ message: "Phone number is required"});
    }
    if (!date_of_birth) {
        errors.push({ message: "Date of birth is required"});
    }
    if (!password) {
        errors.push({ message: "Please enter your password"});
    }
    if (!password !== password2) {
        errors.push({ message: "Your passwords do not match"});
    }

    // NOTE If there is any validation errors, send error status and message
    return {
        errors,
        notValid: Boolean(errors.length)
    }
};