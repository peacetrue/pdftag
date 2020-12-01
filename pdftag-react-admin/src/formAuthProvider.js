let FormAuthProvider = (url, httpClient) => {
    return {
        login: params => {
            return httpClient(`${url}/login`, {method: 'post', body: params})
                .then(token => {
                    console.info("login token:", token);
                    localStorage.setItem('token', JSON.stringify(token));
                    if (!token.authorities) return;
                    let authorities = token.authorities.map(item => item.authority.replace('ROLE_', ''));
                    let isSuperManager = authorities.indexOf('SUPER_MANAGER') !== -1;
                    localStorage.setItem('permissions', JSON.stringify({
                        isSuperManager: isSuperManager,
                        isManager: isSuperManager || authorities.indexOf('MANAGER') !== -1,
                        roles: authorities
                    }));
                });
        },
        logout: params => {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            httpClient(`${url}/logout`, {method: 'post', body: params});
            return Promise.resolve();
        },
        getIdentity: () => {
            let token = localStorage.getItem('token');
            if (token) {
                let user = JSON.parse(token);
                return Promise.resolve({...user, fullName: user.username});
            }
            return Promise.reject();
        },
        checkAuth: params => {
            return localStorage.getItem("token")
                ? Promise.resolve()
                : Promise.reject();
        },
        checkError: error => {
            console.error("error:", JSON.stringify(error));
            if (error.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('permissions');
                return Promise.reject("unauthorized");
            }
            return Promise.resolve();
        },
        getPermissions: params => {
            console.info("getPermissions:", params);
            const role = localStorage.getItem('permissions');
            return role ? Promise.resolve(JSON.parse(role)) : Promise.reject();
        },
    };
};

export default FormAuthProvider;
