import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  recentPayableTransactions: {
    maxWidth: 350,
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