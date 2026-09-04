export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");

    const response = await fetch("/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("access", data.access);
        return data.access;
    }

    return null;
};


export const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("access");

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        token = await refreshAccessToken();

        if (!token) {
            return response;
        }

        response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    return response;
};