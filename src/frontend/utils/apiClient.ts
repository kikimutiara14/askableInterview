/**
 * Makes a GET request to the given URL with optional query parameters and options.
 * @param url - The API endpoint (relative or absolute).
 * @param queryParams - An object of query parameters.
 * @param options - Fetch API options.
 * @returns The parsed JSON response.
 */

const AUTH = 'Basic ' + Buffer.from('admin:password').toString('base64');

export async function apiClient<T>(
    url: string,
    queryParams?: Record<string, any>,
    options: RequestInit = {},
): Promise<T> {
    const queryString = queryParams ? '?' + new URLSearchParams(queryParams).toString() : '';
    const response = await fetch(`${url}${queryString}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: AUTH,
            ...(options.headers || {}),
        },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}
