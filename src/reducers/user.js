const user = { isLoggedIn: false };

const User = (state = user, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return Object.assign({}, action.user, {
                isLoggedIn: true
              });
        case 'LOGIN_FAILED':
              return Object.assign({}, action.user, {
                isLoggedIn: false
              });
        default:
            return state;
    }
};

export default User;
