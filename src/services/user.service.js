import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getDetails
};

function login (username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${process.env.VUE_APP_API_URL}/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('login', username, password, user)
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout () {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${process.env.VUE_APP_API_URL}/user/logout`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response)
        });
}

function getDetails () {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.VUE_APP_API_URL}/user/user-details`, requestOptions).then(handleResponse);
}

function handleResponse (response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}