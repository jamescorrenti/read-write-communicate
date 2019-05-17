export function handleAPIErrors(res) {
    // this is needed to catch 404, 500 errors, etc.
    if (!res.ok) {
        console.log("API errors",res)
        throw Error(res.statusText);
    }
    return res;   
}