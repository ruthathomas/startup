// modelled off of the sample code from simon

export class AuthState {
    static Authenticated = new AuthState('authenticated');
    static Unauthenticated = new AuthState('unauthenticated');

    constructor(name) {
        this.name = name;
    }
}