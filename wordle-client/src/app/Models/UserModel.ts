export class UserModel {
    public name: string;
    public emailId: string;
    public password: string;

    constructor() {
        this.name = "";
        this.emailId = "";
        this.password = "";
    }

    import(name: string | null, email: string | null, password: string | null) {
        this.name = name ? name : "";
        this.emailId = email ? email : "";
        this.password = password ? password : "";
    }
}