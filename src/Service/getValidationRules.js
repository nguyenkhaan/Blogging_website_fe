const validationRules = {
    Email: {
        required: "Không được bỏ trống trường này",
        pattern: {
            value: /^(?!.*[\^&*$%])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Email không hợp lệ hoặc chứa ký tự đặc biệt ^ & * $ %"
        }
    },
    Password: {
        required: "Không được bỏ trống trường này",
        minLength: {
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự"
        },
        pattern: {
            value: /^[^\s^&*$%]+$/, // ví dụ: không chứa ^ & * $ %
            message: "Mật khẩu không được chứa ký tự đặc biệt ^ & * $ %"
        }
    },
    Password_again: {
        required: "Không được bỏ trống trường này",
        minLength: {
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự"
        },
        pattern: {
            value: /^[^\s^&*$%]+$/, // ví dụ: không chứa ^ & * $ %
            message: "Mật khẩu không được chứa ký tự đặc biệt ^ & * $ %"
        }, 
    },
    default: {
        required: "Không được bỏ trống trường này"
    }
}
export { validationRules }