// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';


// create a new class to instantiate for a user
class AuthService {

    // check if user's logged in
    loggedIn() {
    // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }
    
    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        // window.location.assign('/'); 
        // window.location.reload();
    }
}

export default new AuthService();