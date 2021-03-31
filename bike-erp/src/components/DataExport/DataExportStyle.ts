import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "30%",
    [theme.breakpoints.down('md')]: {
      width: "250px"
    },
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  date: {
    display:"flex",
    alignItems:"center"
  },
  close: {
    position:"absolute",
    top: 10,
    right: 10,
  },
  dateBox: {
    width:"70%"
  },
  title: {
    textAlign:"center"
  },
  errorMessage: {
    fontSize:"12px",
    color:"red"
  },
  confirmationButton:{
    textAlign:"center",
    margin:"50"
  },
  confirmationModal: {
    position: 'absolute',
    width: "20%",
    [theme.breakpoints.down('md')]: {
      width: "200px"
    },
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  confirmButton: {
    marginTop: "10px"
  },
  myData: {
    display: "flex",
    paddingTop: "10px",
    alignItems: "center"
  },
  myDataTitle: {
    paddingTop: "5px"
  }
}));

export default useStyles;