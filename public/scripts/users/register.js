import { apiUrl } from '../export/config.js';
import { setUserInfo } from '../export/cookies.js';
import { showMessage } from '../export/utils.js';

const register = async ({ first_name, last_name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                first_name,
                last_name,
                email,
                password
            }
        });
        if(response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

const firstNameEl = document.getElementById("first_name");
const lastNameEl = document.getElementById("last_name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");

const checkFirstName = () => {
    let valid = false;
    const min = 2,
    max = 25;
    const name = firstNameEl.value.trim();
    if(!isRequired(name)) {
        showError(firstNameEl, 'Sorry, first name cannot be blank');
    }else if (!isBetween(name.length, min, max)) {
        showError(firstNameEl, `Sorry, first name must be between ${min} and ${max} characters`)
    }else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {
    let valid = false;
    const min = 2,
    max = 25;
    const name = lastNameEl.value.trim();
    if(!isRequired(name)) {
        showError(lastNameEl, 'Sorry, last name cannot be blank');
    }else if (!isBetween(name.length, min, max)) {
        showError(lastNameEl, `Sorry, last name must be between ${min} and ${max} characters`)
    }else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if(!isRequired(email)) {
        showError(emailEl, 'Sorry, email cannot be blank');
    }else if (!isEmailValid(email)) {
        showError(emailEl, 'Sorry, email is not valid')
    }else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if(!isRequired(password)) {
        showError(passwordEl, 'Sorry, password cannot be blank');
    }else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Sorry, password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)');
    }else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
    
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;
    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');
    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
         if(timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

//check everything
document.getElementById('register-form').addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first_name':
            checkFirstName();
            break;
        case 'last_name':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = 
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid;

    if(isFormValid) {
        const data = await register({
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            setUserInfo(data);
            location.href = '/';
        }
    }else {
        showMessage('Please re-enter your details and try again');
    }
});