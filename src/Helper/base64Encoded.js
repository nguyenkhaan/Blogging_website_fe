function base64Encoded(str) {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");

    // Thêm padding nếu thiếu
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    // Giải mã
    return atob(base64);
} 
export {base64Encoded}