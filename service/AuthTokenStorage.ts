export default new (class {
    readonly JWT_ROOT_TOKEN_FIELD = 'jwtRootToken';
    readonly JWT_CURRENT_TOKEN_FIELD = 'jwtToken';

    getToken = () => {
        if (typeof window === 'undefined') {
            return;
        }
        const token = localStorage.getItem(this.JWT_CURRENT_TOKEN_FIELD);

        if (
            token === '' ||
            token === 'undefined' ||
            typeof token === 'undefined'
        ) {
            return null;
        }

        return token;
    };

    getRootToken = () => {
        if (typeof window === 'undefined') {
            return;
        }
        const token = localStorage.getItem(this.JWT_ROOT_TOKEN_FIELD);
        if (
            token === '' ||
            token === 'undefined' ||
            typeof token === 'undefined'
        ) {
            return null;
        }

        return token;
    };
    saveRootToken = (token: string) => {
        if (typeof window === 'undefined') {
            return;
        }
        return localStorage.setItem(this.JWT_ROOT_TOKEN_FIELD, token);
    };

    clearRootToken = () => {
        if (typeof window === 'undefined') {
            return;
        }
        return localStorage.removeItem(this.JWT_ROOT_TOKEN_FIELD);
    };

    setToken = (token: string) => {
        if (typeof window === 'undefined') {
            return;
        }
        return localStorage.setItem(this.JWT_CURRENT_TOKEN_FIELD, token);
    };

    clearToken = () => {
        if (typeof window === 'undefined') {
            return;
        }
        return localStorage.setItem(this.JWT_CURRENT_TOKEN_FIELD, '');
    };
})();
