export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {console.log(user.authdata)
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}