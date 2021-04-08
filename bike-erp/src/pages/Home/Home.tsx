// DEPENDENCIES
import { connect } from "react-redux";
import { logout } from "../../redux/actions/AccountActions/accountAction";

// SERVICES
import RecentPayableTransactions from "../../components/RecentPurchases/RecentPayableTransactions";
import RecentReceivableTransactions from "../../components/RecentPurchases/RecentReceivableTransactions";

// STYLING
import { Typography } from "@material-ui/core";
import useStyles from "./HomeStyles";

/*
  The homepage.
*/
const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h1">Welcome</Typography>
      <div className={classes.content}>
        <RecentPayableTransactions />
        <RecentReceivableTransactions />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
