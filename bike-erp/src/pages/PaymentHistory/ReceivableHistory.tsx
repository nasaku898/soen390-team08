// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@material-ui/core";
import useStyles from "./ReceivableHistoryStyle";
import DataExport from "../../components/DataExport/DataExport";

/*
  This page pertains to the accounts receivable.
  This page is accessible to users to track their expenses relative to ordering bikes.
*/
const ReceivableHistory = ({ account }: any) => {

  const classes = useStyles();
  const backend = BACKEND_URL;
  const reportType = "receivable";

  const [accountReceivables, setAccountReceivables] = useState({});
  const [accountSpecifics, setAccountSpecifics] = useState({});

  useEffect(() => {
    axios
      .get(`${backend}/finance/accountReceivables`)
      .then((response) => {
        setAccountReceivables(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [backend]);

  const getAccountSpecifics = (id: number) => {
    axios
      .get(`${backend}/finance/accountReceivables/${id}/bikes`)
      .then((response) => {
        setAccountSpecifics(response.data)
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  return (
    <div className={classes.receivableHistory}>
      <h1>Receivable History</h1>
      <div className={classes.userDetails}>
        <Typography>{account.firstName + " " + account.lastName}</Typography>
        <Typography variant="caption">{account.email}</Typography>
      </div>
      <Paper className={classes.place}>
        <div>
          <Table size="small" className={classes.dataContainer}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Order number</TableCell>
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader}>Total</TableCell>
                <TableCell className={classes.tableHeader}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Object.keys(accountReceivables).length !== 0 && Object.values(accountReceivables).map((order: any) => (
                  <TableRow key={order.account_receivable_id}>
                    <TableCell className={classes.orderCell}>{order.account_receivable_id}</TableCell>
                    <TableCell className={classes.orderCell}>{order.payable_date.substring(0, 10)}</TableCell>
                    <TableCell className={classes.orderCell}>{"$" + order.total.toFixed(2)}</TableCell>
                    <TableCell className={classes.orderCell}>
                      <Button color="primary"
                        onClick={() => getAccountSpecifics(order.account_receivable_id)}
                      >
                        See More
                    </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <Table size="small" className={classes.dataContainer}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={5} className={classes.tableHeader}>Order Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.orderCell}>ID</TableCell>
                <TableCell className={classes.orderCell}>Description</TableCell>
                <TableCell className={classes.orderCell}>Unit Price</TableCell>
                <TableCell className={classes.orderCell}>Quantity</TableCell>
                <TableCell className={classes.orderCell}>Cost</TableCell>
              </TableRow>
              {
                accountSpecifics !== {} && Object.values(accountSpecifics).map((item: any) => (
                  <TableRow key={item.bike_id}>
                    <TableCell className={classes.orderCell}>{item.bike_id}</TableCell>
                    <TableCell className={classes.orderCell}>{item.bike_description}</TableCell>
                    <TableCell className={classes.orderCell}>{"$" + item.price.toFixed(2)}</TableCell>
                    <TableCell className={classes.orderCell}>{item.quantity}</TableCell>
                    <TableCell className={classes.orderCell}>{"$" + (item.price* item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
      <br/>
      <Box className={classes.export}>
        <DataExport reportType={reportType}></DataExport>
      </Box>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(ReceivableHistory);