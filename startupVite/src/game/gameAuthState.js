// modeled off of authState.js

export class GameAuthState {
    static Validated = new GameAuthState('validated');
    static Unvalidated = new GameAuthState('unvalidated');

    constructor(name) {
        this.name = name;
    }
}