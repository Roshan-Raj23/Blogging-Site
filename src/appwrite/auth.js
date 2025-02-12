import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appUrl)
            .setProject(conf.appProjectID)
        this.account = new Account(this.client);
    }

    async createAccount(email, password , name) {
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password, name);
            
            if (userAccount) {
                // Login the user after creating the account
                return this.login(email, password);
            } else {
                return userAccount
            }
        } catch {
            return null;
        }
    }

    async login(email, password) {
        try { 
            return await this.account.createEmailPasswordSession(email, password);
        } catch {
            console.log("Wrong Email or Password");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            // console.log('Error getting current user:' , error);
            return null
        }
    }

    async logout() {
        try {
            const test = await this.account.deleteSessions();
            return test
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }

}

const authService = new AuthService();
export default authService;