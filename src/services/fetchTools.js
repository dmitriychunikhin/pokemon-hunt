
export const fetchJSON = async (url, params) => {

    const resFetch = await fetch(url, params);

    const resJSON = await resFetch.json()

    if (resFetch.ok === false && resFetch.statusText) {
        if (!resJSON) {
            throw new Error(`${resFetch.status}: ${resFetch.statusText}`);
        }
        if (!resJSON?.error) {
            return { ...resJSON, error: `${resFetch.status}: ${resFetch.statusText}` };
        }
    }

    if (!resJSON) return;

    return resJSON;
}