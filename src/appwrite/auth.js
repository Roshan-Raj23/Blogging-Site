import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";
import Login from './../pages/Login';

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
        } catch (error) {
            console.log('Error creating account:', error);
            return null;
        }
    }

    async login(email, password) {
        // const promise = this.account.createEmailPasswordSession(email, password);

        // promise.then(function (response) {
        //     console.log(response); // Success
        //     console.log("Login Success");
        // }, function (error) {
        //     console.log(error); // Failure
        //     console.log("Login Failed");
        // });

        try { 
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log('Error logging in:', error);
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
    
    // async getCurrentUser() {
    //     try {
    //         return await this.account.get();
    //     } catch (error) {
    //         console.log("Appwrite serive :: getCurrentUser :: error", error);
    //     }

    //     return null;
    // }


    async logout() {
        try {
            const test = await this.account.deleteSessions();
            console.log("Logout Success")
            return test
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }

}

const authService = new AuthService();

export default authService;