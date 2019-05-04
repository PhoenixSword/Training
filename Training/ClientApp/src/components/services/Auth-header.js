export function token() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return user.token;
    } else {
        return "";
    }
}

export function role() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
        return user.role;
    } else {
        return "";
    }
}