export const logInSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    user
});

export const logInFailed = (user) => ({
    type: 'LOGIN_FAILED',
    user
});

export const setPhone = (phoneNumber) => ({
    type: 'SET_PHONE',
    payload: phoneNumber
});

export const setPassword = (password) => ({ 
    type: 'SET_PASSWORD',
    payload: password
});

export const submitForm = (isSubmitted) => ({
    type: 'SUBMIT_FORM',
    payload: isSubmitted
});
