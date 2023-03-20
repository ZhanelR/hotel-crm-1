import * as types from "./userActionTypes";

export const login =(authorizationData) => ({
    type: types.LOG_IN,
    payload: authorizationData,
});

export const logout = ()=> ({
    type: types.LOG_OUT,
});

export const registerStart =() => ({
    type: types.REGISTER_START,
});

export const registerSuccess =(user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});

export const registerFail =(error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
});

/* export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
            user.updateProfile({
                displayName
            })
            dispatch(registerSuccess(user))
        }).catch((error) => dispatch(registerFail(error.message)));
    }}; */
