function generetaAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены некоректно.";
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким Email не существует";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует.";
        default:
            return "Слишком много попыток входа. Попробуйте позднее.";
    }
}

export default generetaAuthError;
