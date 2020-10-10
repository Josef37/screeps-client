export const fetchJSON = (url: string, body: any, method: string) => (
    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
)

export const postJSON = (url: string, body: any) => fetchJSON(url, body, 'POST')
export const getJSON = (url: string, body: any) => fetchJSON(url, body, 'GET')
