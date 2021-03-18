import { UserLogDAO } from "../../dao/UserLogDAO";

/**
 * This class handles handles registering the logs of user actions in order to track audit logs for debugging and tracking purposes
 */
export class UserLogService{
    private static userLogService: UserLogService | undefined;
  
    //restrict so that the service cannot be constructed outside of the class. For singleton pattern
    private constructor() {}
  
    //Creating a static instance of the UserLogDao Class
    private static userLogDao = new UserLogDAO();
  
    //Getter for the userLogDao instance variable
    public static getUserLogDao = () => {
      return UserLogService.userLogDao;
    };
  
    // Instantiating the singleton or return it
    public static getUserLogService() {
      if (this.userLogService === undefined) {
        this.userLogService = new UserLogService();
      } else {
        return this.userLogService;
      }
    }

    public static addLog = (
        email: string,
        activity: string
    ) => {
    return new Promise(async (resolve, reject) => {
      await UserLogService.userLogDao
              .addToUserLog(
                email,
                activity
              )
              .then((response) => {
                resolve({ status: 201, message: response.message });
              })
              .catch((error) => {
                reject({ status: 404, message: "Failed to add log." });
              });
        })}

  public static getLog = (
    email : string
    ) => {
      return new Promise(async (resolve, reject) => {
        await UserLogService.userLogDao
                .fetchUserLog(
                  email
                )
                .then((response) => {
                  resolve({ status: 201});
                })
                .catch((error) => {
                  reject({ status: 404, message: "Failed to get log." });
                });
          })
    }

  public static getAllLogs = () => {
    return new Promise(async (resolve, reject) => {
      await UserLogService.userLogDao
              .fetchAllLogs()
              .then((response) => {
                resolve({ status: 201});
              })
              .catch((error) => {
                reject({ status: 404, message: "Failed to get all logs." });
              });
        })
  }
    
}