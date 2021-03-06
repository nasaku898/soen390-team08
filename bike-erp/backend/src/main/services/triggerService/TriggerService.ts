import { TriggersDao } from "../../dao/TriggersDao";

const triggersDao = new TriggersDao();

export class TriggerService {

  // Retrieve all triggers from user by email
  public getCurrentTriggers = (email: string) => {
    return triggersDao.fetchUserTriggers(email);
  };

  // Toggle trigger state
  public toggleTrigger = (triggerType: string, email: string) => {
    return triggersDao.updateTriggerState(triggerType, email);
  };

  // Retrieve all triggers from user by email
  public addUserTriggers = (email: string) => {
    return triggersDao.addUserTriggers(email);
  };

  public getTriggersAsArray = (email: string) => {
    return triggersDao.fetchUserTriggers(email);
  };

}
