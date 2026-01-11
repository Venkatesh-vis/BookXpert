const KEY = "isAuth";

export const login = (username, password) => {
    if (username && password) {
        localStorage.setItem(KEY, "true");
        return true;
    }
    return false;
};

export const logout = () => localStorage.removeItem(KEY);

export const isAuthenticated = () =>
    localStorage.getItem(KEY) === "true";
