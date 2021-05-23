export function authHeader () {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.auth) {
        return { 'x-access-token': user.access_token };
    } else {
        return {};
    }
}