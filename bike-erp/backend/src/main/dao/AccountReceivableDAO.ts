import db from "../helpers/db"

// This class is a DAO that handle manipulating the database table account_receivable
export class AccountReceivableDAO {

    // Insert a new row to database (account receivable)
    public createAccountReceivable(total: number, payableDate: string, email: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO account_receivable (email,total, payable_date)
                VALUES ('${email}', ${total}, '${payableDate}')`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }

    // Insert a new row to database (bike_in_account_receivable)
    public createBikeInAccountReceivable(accountReceivableId: number, bikeId: number) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO bike_in_account_receivable (account_receivable_id, bike_id)
                VALUES ('${accountReceivableId}',${bikeId})`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(true);
            })
        })
    }

    // Select all account receivable based on email
    public fetchAllAccountReceivableByUser(email: string) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM account_receivable
                WHERE email='${email}'`
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    }

    // Select all bikes based on account receivable id
    public fetchBikesByAccountReceivableId(account_receivable_id: number) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT bike.*  
                FROM bike, bike_in_account_receivable 
                WHERE bike_in_account_receivable.account_receivable_id = ${account_receivable_id}
                AND bike.bike_id = bike_in_account_receivable.bike_id;`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                const response = JSON.parse(JSON.stringify(rows));
                // If response is empty
                if (response.length === 0) {
                    reject({ status: 400, message: "Account Receivable Not Found" });
                }
                resolve(response);
            })
        })
    }
}