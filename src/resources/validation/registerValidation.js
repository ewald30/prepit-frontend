/**
 *  Function used to validate register form data
 *  Mail has to be valid
 * 
 *  Password has to have the following:
 *  - 1 uppercase letter
 *  - 1 special character [!@#$&*]
 *  - 2 digits
 *  - 3 lowercase letters
 *  - length of at least 8
 * 
 * @param {*} values values inputted into the register form
 * @returns error messages if there are any
 */
 const PASSWORD_REGEXP_UPPERCASE_CHARACTER = /(?=.*[A-Z])/;
 const PASSWORD_REGEXP_SPECIAL_CHARACTER = /(?=.*[!@#$&*])/;
 const PASSWORD_REGEXP_NUMBER = /(?=.*[0-9].*[0-9])/;
 const PASSWORD_REGEXP_LOWERCASE_CHARACTER = /(?=.*[a-z].*[a-z].*[a-z])/;
 const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const PASSWORD_NUMBER_OF_CHARACTERS = 8;

export const validateRegisterForm = (values) => {
    const errors = {};

    if (!values.fullName) {
        errors.fullName = "Full name is required";
    } else{
        const nameList = values.fullName.trim().split(/\s+/); // Works for multiple spaces
        if (nameList.length< 2){
            errors.fullName = "First and last names separated by space";
        }
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEXP.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!validatePassword(values.password)) {
        errors.password = "Password is not strong enough";
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "Password confirmation is required";
    } else if (values.password !== values.passwordConfirmation){
        errors.passwordConfirmation = "Passwords do not match";
    }

    return errors;
}


const validatePassword = (password) => {

    if (!PASSWORD_REGEXP_UPPERCASE_CHARACTER.test(password)){
        return false;
    }

    if (!PASSWORD_REGEXP_SPECIAL_CHARACTER.test(password)){
        return false
    }

    if (!PASSWORD_REGEXP_NUMBER.test(password)){
        return false;
    }

    if (!PASSWORD_REGEXP_LOWERCASE_CHARACTER.test(password)){
        return false;
    }

    if (password.length < PASSWORD_NUMBER_OF_CHARACTERS){
        return false;
    }

    return true;
}