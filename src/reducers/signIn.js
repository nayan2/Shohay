const initState = { phone: '', password: '', isSubmitted: false };

const SignIn = (state = initState, action) => {
    switch (action.type) {
        case 'SET_PHONE':
            return { ...state, phone: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SUBMIT_FORM':
            return { ...state, isSubmitted: action.payload };
        default:
            return state;
    }
};

export default SignIn;
