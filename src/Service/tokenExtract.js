import { base64Encoded } from "../Helper/base64Encoded";
function getTokenInformation(token) {
    let [header, payload, signature] = token.split(".");

    header = JSON.parse(atob(header));
    // payload = JSON.parse(atob(payload));
    payload = JSON.parse(base64Encoded(payload))
    return {
        header,
        payload,
    };
}
export { getTokenInformation };