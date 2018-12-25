export const signInActions = {
    logInSuccess: (user) => ({
        type: 'LOGIN_SUCCESS',
        payload: user
    }),
    logInFailed: (user) => ({
        type: 'LOGIN_FAILED',
        payload: user
    }),
    setPhone: (phoneNumber) => ({
        type: 'SET_PHONE',
        payload: phoneNumber
    }),
    setPassword: (password) => ({ 
        type: 'SET_PASSWORD',
        payload: password
    }),
    submitForm: (isSubmitted) => ({
        type: 'SUBMIT_FORM',
        payload: isSubmitted
    })
};

export const signUpActions = {
    setSignupPhone: (phone) => ({
        type: 'SET_SIGNUP_PHONE',
        payload: phone
    }),
    setSignupConfirmCode: (code) => ({
        type: 'SET_SIGNUP_CONFIRMCODE',
        payload: code
    }),
    setSignupPassword: (password) => ({
        type: 'SET_SIGNUP_PASSWORD',
        payload: password
    }),
    setSignupConfirmPassword: (password) => ({
        type: 'SET_SIGNUP_CONFIRM_PASSWORD',
        payload: password
    }),
    confirmResult: (confirmResult) => ({
        type: 'SET_SIGNUP_PHONE_CONFIRM_RESULT',
        payload: confirmResult
    }),
    signupPhoneSubmit: (status) => ({
        type: 'SUBMIT_SIGNUP_PHONE',
        payload: status
    }),
    signupConfirmCodeSubmit: (status) => ({
        type: 'SUBMIT_SIGNUP_CONFIRM_CODE',
        payload: status 
    }),
    signupPassStatus: (status) => ({
        type: 'SIGNUP_PASSWORD_STATUS',
        payload: status 
    }),
    signFormSubmit: (status) => ({
        type: 'SIGNUP_FORM_SUBMIT',
        payload: status 
    }),
    setError: (message) => ({
        type: 'SIGNUP_ERROR',
        payload: message
    })
};
