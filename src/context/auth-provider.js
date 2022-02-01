
import React from 'react';
import AuthContext from './auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isLoading: true,
    userToken: null,
}

function reducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'RESTORE_TOKEN': 
            nextState = {
                ...state,
                userToken: action.token,
                isLoading: false,
            }
            return nextState;
        case 'LOGIN': 
            nextState = {
                ...state,
                userToken: action.token,
                isLoading: false,
            }
            return nextState;
        case 'LOGOUT': 
            nextState = {
                ...state,
                userToken: null,
                isLoading: false,
            }
            return nextState;
        default: 
            return state;
    }
}

function AuthProvider ({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        setTimeout(async() => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        }, 1000);
    }, []);

    const authContext = React.useMemo(() => ({
        signIn: async (userToken) => {        
            try {
                await AsyncStorage.setItem('userToken', userToken);
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', token: userToken });
        },
        signOut: async() => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
    }), []);

    return (
        <AuthContext.Provider value={{authContext, state}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
