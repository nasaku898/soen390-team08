import db from "../helpers/db"

export class AccountPayableDAO {
    // Insert a new row to database (transaction_item)
    public createTransactionItems(cost: number, component_id: number, quantity_bought: number) {
        return new Promise((resolve, rejects) => {
            let query = `
                INSERT INTO transaction_item (cost, component_id, quantity_bought)
                VALUES (${cost},${component_id},${quantity_bought})`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }

    // Insert a new row to database (account_payable)
    public createAccountPayable(total: number, payableDate: string, email: string) {
        return new Promise((resolve, rejects) => {
            const query = `
                INSERT INTO account_payable(total,payable_date,email)
                VALUES (${total},'${payableDate}','${email}')`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }
    // Insert a new row to database (consist_of)
    public createConsistOf(account_payable_id: number, transaction_id: number) {
        return new Promise((resolve, rejects) => {
            const query = `
                INSERT INTO consist_of(account_payable_id, transaction_id)
                VALUES (${account_payable_id}, ${transaction_id})`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(true);
            })
        })
    }

    // Fetch from database a list of account payable based on user email
    public getAccountPayableByEmail(email: string) {
        return new Promise((resolve, rejects) => {
            const query = `
                SELECT *
                FROM account_payable
                WHERE email='${email}'`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    }

    // Fetch from database a list of account payable based on account payable id
    public getTransactionByAccountPayableID(accountPayableId: number) {
        return new Promise((resolve, rejects) => {
            const query = `
                SELECT TI.transaction_id, TI.cost, TI.component_id, TI.quantity_bought, C.component_type, C.price, C.size, C.specificComponentType
                FROM consist_of CO, transaction_item TI, component C
                WHERE CO.account_payable_id = ${accountPayableId} 
                AND TI.component_id = C.component_id
                AND CO.transaction_id = TI.transaction_id`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                const response = JSON.parse(JSON.stringify(rows));

                // If response is empty
                if (response.length === 0) {
                    rejects({ status: 400, message: "Account Payable Not Found" });
                }
                resolve(response);
            })
        })
    }
}