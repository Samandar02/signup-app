
export class UserSignIn {
    constructor(public email?: string, 
        public password?: string) { }
}
export class UserSignUp {
    constructor(public email?: string, 
        public password?: string, 
        public userName?: string, 
        public bio?: string, 
        public phoneNumber?: string) {

    }
}
export class UserVM {
    constructor(public Id?: string, 
        public ImgUrl?: string,
        public email?: string, 
        public password?: string, 
        public userName?: string, 
        public bio?: string, 
        public phoneNumber?: string) {
    }
}
