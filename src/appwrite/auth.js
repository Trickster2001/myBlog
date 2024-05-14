import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
    .setEndpoint(conf.appUrl)
    .setProject(conf.projectId);

    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}) {
    try {
        const userAcc =  await this.account.create(ID.unique(), email, password, name)
        console.log("userAcc here", userAcc);
        if(userAcc) {
          // call login
          return this.login({email, password});
        } else {
          return userAcc;
        }
      } catch (error) {
        console.log("appwrite createAccount ", error);
      }
  }
  
  async login({email, password}){
    try {
      // console.log("is anyone ther ",this.getCurrentUser());
      // if(this.getCurrentUser()) {
      //   this.logout()
      // }
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.log("appwrite login ", error);
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get()
    } catch (error) {
      console.log("appwrite getCurrentUser ", error);
    }
    return null;
  }

  async logout(){
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite logout ", error);
    }
  }
}

const authService = new AuthService()

export default authService;