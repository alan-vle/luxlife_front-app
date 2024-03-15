function fullNameValidator(fullNameValue, setFullName, setFullNameIsValid, setFullNameIsNotValid) {
    const frFullNameRegex = /^[a-zA-ZÀ-ÿ\-\' ]+$/;

    if(fullNameValue.length >= 2 && frFullNameRegex.test(fullNameValue)) {
        setFullName(fullNameValue)
        setFullNameIsValid(true)
        setFullNameIsNotValid(false)
    } else {
        setFullName(null)
        setFullNameIsValid(false)
        setFullNameIsNotValid(true)
    }
}

function emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid) {
    const emailValue = e.target.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(emailValue)) {
        setEmail(emailValue)
        setEmailIsValid(true)
        setEmailIsNotValid(false)
    } else {
        setEmail(null)
        setEmailIsValid(false)
        setEmailIsNotValid(true)
    }
}

function addressValidator(e, setAddress, setAddressIsValid, setAddressIsNotValid) {
    const addressValue = e.target.value
    const addressRegex = /^[0-9]+(?:[ ,.-][a-zA-ZÀ-ÿ0-9]+)+ (?:[0-9]{5}(?:-[0-9]{4})?|(?:[0-9]{5}(?:-[0-9]{4})? [a-zA-ZÀ-ÿ0-9]+))$/;
    if(addressRegex.test(addressValue)) {
        setAddress(addressValue)
        setAddressIsValid(true)
        setAddressIsNotValid(false)
    } else {
        setAddress(null)
        setAddressIsValid(false)
        setAddressIsNotValid(true)
    }
}

function phoneNumberValidator(e, setPhoneNumber, setPhoneNumberIsValid, setPhoneNumberIsNotValid) {
    const phoneValue = e.target.value
    const field = e.target
    const phoneRegex = /^(0|\+33|\+330|0033)[67]\d{0,8}$/;

    if (phoneValue.startsWith('+330')){
        field.maxLength = 13;
    } else if(phoneValue.startsWith('0')) {
        field.maxLength = 10;
    }

    if(phoneRegex.test(phoneValue)) {
        setPhoneNumber(phoneValue.replace(/^(0|\+330|0033)/, ''))
        setPhoneNumberIsValid(true)
        setPhoneNumberIsNotValid(false)
    } else {
        setPhoneNumber(null)
        setPhoneNumberIsValid(false)
        setPhoneNumberIsNotValid(true)
    }
}

function birthDateValidator(e, setBirthDate, setBirthDateIsValid, setBirthDateIsNotValid, setRequiredAge) {
    const birthDateValue = new Date(e.target.value);

    if (isNaN(birthDateValue.getTime())) {
        setBirthDate(null)
        setBirthDateIsValid(false)
        setBirthDateIsNotValid(true)
        setRequiredAge(false)
        return;
    }
    const currentDate = new Date()
    const requiredAge = currentDate.setFullYear(currentDate.getFullYear() - 18);

    if(birthDateValue <= requiredAge) {
        setBirthDate(birthDateValue.toLocaleDateString())
        setBirthDateIsValid(true)
        setBirthDateIsNotValid(false)
        setRequiredAge(true)
    } else {
        setBirthDate(null)
        setBirthDateIsValid(false)
        setBirthDateIsNotValid(true)
        setRequiredAge(false)
    }
}

function passwordValidator(
    e,
    setPassword,
    setPasswordIsValid,
    setPasswordIsNotValid,
    setPasswordLength = null,
    setPasswordLowUp = null,
    setPasswordNumber = null,
    setPasswordSymbol = null
) {
    const passwordValue = e.target.value
    const goodLength = contains10Carac(passwordValue, setPasswordLength)
    const containsLowerAndUpper = containsLowerAndUpperCarac(passwordValue, setPasswordLowUp)
    const containsNumbers = containsTwoNumbers(passwordValue, setPasswordNumber)
    const containsSymbols = containsSpecialSymbols(passwordValue, setPasswordSymbol)

    if(goodLength && containsLowerAndUpper && containsNumbers && containsSymbols) {
        setPassword(passwordValue)
        setPasswordIsValid(true)
        setPasswordIsNotValid(false)
    } else {
        setPassword(passwordValue)
        setPasswordIsValid(false)
        setPasswordIsNotValid(true)
    }
}

function confirmPasswordValidator(e, password, passwordIsValid, setConfirmPassword, setConfirmPasswordIsValid, setConfirmPasswordIsNotValid) {
    const confirmPasswordValue = e.target.value

    if(confirmPasswordValue === password && passwordIsValid) {
        setConfirmPassword(confirmPasswordValue)
        setConfirmPasswordIsValid(true)
        setConfirmPasswordIsNotValid(false)
    } else {
        setConfirmPassword(null)
        setConfirmPasswordIsValid(false)
        setConfirmPasswordIsNotValid(true)
    }
}

function contains10Carac(passwordValue, setPasswordLength) {
    if(passwordValue.length >= 10) {
        setPasswordLength !== null ? setPasswordLength(true) : ''

        return true;
    } else {
        setPasswordLength !== null ? setPasswordLength(false) : ''

        return false;
    }
}
function containsLowerAndUpperCarac(passwordValue, setPasswordLowUp) {
    const lowerCaracRegex = /[A-Z]/;
    const UpperCaracRegex = /[a-z]/;

    if(lowerCaracRegex.test(passwordValue) && UpperCaracRegex.test(passwordValue)) {
        setPasswordLowUp !== null ? setPasswordLowUp(true) : ''

        return true;
    } else {
        setPasswordLowUp !== null ? setPasswordLowUp(false) : ''

        return false;
    }
}

function containsTwoNumbers(passwordValue, setPasswordNumber) {
    const passwordNumber = /.*\d.*\d.*/;

    if(passwordNumber.test(passwordValue)) {
        setPasswordNumber !== null ? setPasswordNumber(true) : ''

        return true;
    } else {
        setPasswordNumber !== null ? setPasswordNumber(false) : ''

        return false;
    }
}

function containsSpecialSymbols(passwordValue, setPasswordSymbol) {
    const symbolsRegex = /[!@#?]/g;
    const symbolsMatch = passwordValue.match(symbolsRegex);

    if (symbolsMatch && symbolsMatch.length >= 2) {
        setPasswordSymbol !== null ? setPasswordSymbol(true) : ''

        return true;
    } else {
        setPasswordSymbol !== null ? setPasswordSymbol(false) : ''

        return false;
    }
}

export {fullNameValidator, emailValidator, addressValidator, phoneNumberValidator, birthDateValidator, passwordValidator, confirmPasswordValidator}