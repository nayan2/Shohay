const initState = { 
    phone: '',
    confirmCode: '',
    password: '',
    confirmPassword: '',
    isPhoneSubmitted: false,
    isConfirmCodeSubmitted: false,
    isPasswordMatch: false,
    isFormSubmitted: false
 };

const SignUp = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SIGNUP_PHONE':
            return { ...state, phone: action.payload };
        case 'SET_SIGNUP_CONFIRMCODE':
            return { ...state, confirmCode: action.payload };
        case 'SET_SIGNUP_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_SIGNUP_CONFIRM_PASSWORD':
            return { ...state, confirmPassword: action.payload };
        case 'SUBMIT_SIGNUP_PHONE':
            return { ...state, isPhoneSubmitted: action.payload };
        case 'SUBMIT_SIGNUP_CONFIRM_CODE':
            return { ...state, isConfirmCodeSubmitted: action.payload };
        case 'SIGNUP_PASSWORD_STATUS':
            return { ...state, isPasswordMatch: action.payload };
        case 'SIGNUP_FORM_SUBMIT':
            return { ...state, isFormSubmitted: action.payload };
        default:
            return state;
    }
};

export default SignUp;
