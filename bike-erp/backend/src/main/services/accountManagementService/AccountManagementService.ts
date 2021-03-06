import { AccountDao } from "../../dao/AccountDAO";
import { Role } from "../../models/Account";
import { UserLogService } from "../userlogService/UserLogService";
import { EmailService } from "../emailService/emailService";
import { TriggerService } from "../triggerService/TriggerService";

export class AccountManagementService {
  // Creating a static accountManagementService object
  private static accountManagementService: AccountManagementService | undefined;

  // Creating a private constructor to apply the singleton pattern (only instance of the class)
  private constructor() {}

  // Creating method to create an instance of the AccountManagementService if not already created
  public static getAccountManagementService() {
    if (this.accountManagementService === undefined) {
      this.accountManagementService = new AccountManagementService();
    } else {
      return this.accountManagementService;
    }
  }

  // Creating a static instance of the AccountDao Class
  private static accountDao = new AccountDao();

  // Getter for the accountDao instance variable
  public static getAccountDao = () => {
    return AccountManagementService.accountDao;
  };

  // Method to update the role of the user
  public static updateRole = (
    currentUserEmail: string,
    email: string,
    role: Role
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      let error: boolean = false;

      // Verifying if the role given is valid
      if (Role[role] === undefined) {
        // Returns role that is invalid and the account related
        reject({
          status: 400,
          message: "Invalid role.",
          email: email,
          role: role,
        });
        error = true;
      }

      //Fetching email account
      const account = await AccountManagementService.accountDao.fetchAccount(
        email
      );

      // Verifying if the email is in the database
      if (account.length === 0) {
        // Returns email that is invalid
        reject({ status: 400, message: "Invalid email.", email: email });
        error = true;
      }

      // Verifying if the current user is trying to changer their own role
      if (currentUserEmail === email) {
        // Returns error message, role and the account related
        reject({
          status: 400,
          message: "You cannot change the role of your own account.",
          email: email,
          role: role,
        });
        error = true;
      }

      // Updating the user role
      if (!error) {
        AccountManagementService.accountDao
          .updateAccountRole(email, role)
          .then((response) => {
             UserLogService.addLog(email, "Updated role").catch((error)=> {});
            resolve({ status: 202, message: response });
          })
          .catch((error) => {
            reject({ status: error.status, message: error.message });
          });
        
        // check triggers and send email to the person whose role has been changed
        const triggerService : TriggerService = new TriggerService();
        
        triggerService.getCurrentTriggers(currentUserEmail).then(async (response) =>{
        const triggers : any[] = response;
        if(triggers[0].ROLE_CHANGE){
          await EmailService.email(email, "Role Change Advisory", "Your Bike King Inc. account has been updated and your role has been updated.").catch((error)=>{ console.log("An error has occured sending the email")});
        }
      })
      .catch((error) => {
      })
      }
    });
  };

  // Method to fetch the account from database
  public static getAccounts = (currentUserEmail: string) => {
    return new Promise<any>((resolve, reject) => {
      AccountManagementService.accountDao
        .fetchAccountTable(currentUserEmail)
        .then((response) => {
          resolve({ status: 202, accounts: response });
        })
        .catch((error) => {
          reject({ status: error.status, message: error.message });
        });
    });
  };
}