class User {
    constructor(username, password, role, email, phone, preferences) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.phone = phone;
        this.preferences = preferences;
    }

    // Métodos para manejar usuarios
    updateProfile(newEmail, newPhone, newPreferences) {
        this.email = newEmail;
        this.phone = newPhone;
        this.preferences = newPreferences;
    }

    validatePassword(password) {
        return this.password === password;
    }
}

export default User;