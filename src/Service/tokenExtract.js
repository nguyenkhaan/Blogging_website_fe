function getTokenInformation(token) {
    let [header, payload, signature] = token.split(".");

    header = JSON.parse(atob(header));
    payload = JSON.parse(atob(payload));
    return {
        header,
        payload,
    };
}
export { getTokenInformation };
