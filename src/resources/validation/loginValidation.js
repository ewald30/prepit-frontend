/**
 * Validates the login form inputs
 * @param {*} values values to validate
 * @returns error messages if there are any
 */
export const validateLoginForm = (values) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const errors = {};
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Password is required";
    }
    return errors;
}