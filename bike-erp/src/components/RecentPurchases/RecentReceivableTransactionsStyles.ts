import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  recentReceivableTransactions: {
    maxWidth: 350,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    }
  },
  headerCell: {
    paddingTop: 0
  },
  seeMore: {
    backgroundColor: "black"
  }
}));

export default useStyles;
