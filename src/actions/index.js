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
    })
};
