export const ACCESS_TOKEN: string = 'access_token';

export function persistLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function retrieveFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}
