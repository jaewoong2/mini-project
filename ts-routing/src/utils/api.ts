const __URL__ = 'https://my-json-server.typicode.com/jaewoong2/Fake_api/';

export const request = async ({ method = "GET", END_POINT, key }: { method?: "GET" | "POST" | "PUT", END_POINT: string, key: string }) => {
    try {
        const data = await fetch(__URL__ + END_POINT, {
            method,
        }).then(res => res.json());

        setLocalStorage(key, data);
        return data;
    } catch (err) {
        window.alert(err);
        new Error(err);
        return null;
    }
}

export const setLocalStorage = <T extends {}>(key: string, data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export const getLocalStorage = (key: string) => {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}