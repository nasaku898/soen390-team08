// DEPENDENCIES
import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"

// SERVICES
import { BACKEND_URL } from "../../core/utils/config"
import { removeAllItem, changeQuantity, deleteItemFromCart } from "../../redux/actions/OrderListActions/orderListAction"

// STYLING
import { Grid, Typography, Button } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import useStyles from "./OrderSummaryStyle"

const OrderSummary = ({ orderList, removeItem, removeAllItems, updateQuantity }: any) => {
  const classes = useStyles()
  const url = BACKEND_URL
  const [total, setTotal] = useState(0)

  // Update the list of order in the backend
  const updateQuantityOfListOrder = () => {
    if (orderList.orderList.length > 0) {
      axios.put(`${url}/components/orderComponents`, { orderList: orderList })
      clearCart()
    }
  };

  const clearCart = () => {
    removeAllItems()
    setTotal(0)
  };

  useEffect(() => {
    let cartTotal=0
    for(let i=0;i<orderList.orderList.length;i++) {
      cartTotal = cartTotal + orderList.orderList[i].price * orderList.orderList[i].selectedQuantity
      if(orderList.orderList.length-1===i) {
        setTotal(cartTotal)
      }
    }
  }, [orderList.orderList])

  const ItemRow = ({ component }) => {
    const [componentId] = useState(component.id)

    return (
      <Grid item container xs={12} className={classes.itemRow} alignItems="center" >
        <Grid item xs={1}>
          <Button onClick={() => { removeItem(orderList.orderList, componentId) }}>
            <RemoveCircleOutlineIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.item}>{component.info}</Typography>
        </Grid>
        <Grid item xs={3} container alignItems="center">
          <Grid item xs={4} >
            <Button onClick={() => {
                if (!(component.selectedQuantity - 1 < 1)) {
                  setTotal(total => total - component.price)
                  updateQuantity(orderList.orderList, componentId, component.selectedQuantity - 1)
                }
              }}>
                <RemoveIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.item}>{component.selectedQuantity}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Button onClick={() => {
              setTotal(total => total + component.price)
              updateQuantity(orderList.orderList, componentId, component.selectedQuantity + 1)
            }}>
              <AddIcon />
            </Button>
          </Grid>

        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.item}>$ {component.price}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.item}>$ {Number(component.price) * Number(component.selectedQuantity)}</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={classes.billingContainer}>
      <Grid container spacing={0} >
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>Billing</Typography>
        </Grid>
        <Grid item container xs={12} className={classes.headerRow}>
          <Grid item className={classes.header} xs={1}></Grid>
          <Grid item xs={2}>
            <Typography className={classes.header} variant="h6">Name</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.header} variant="h6">Quantity</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.header} variant="h6">Unit Price</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.header} variant="h6">Total</Typography>
          </Grid>
        </Grid>
        {
            orderList.orderList.map((component) => (
              <ItemRow key={component.id} component={component}></ItemRow>
            ))
          }
      </Grid>
      {
        orderList.orderList.length !== 0
        && <>
          <Typography variant="h6">Total: ${total}</Typography>
          <Button variant="contained" onClick={updateQuantityOfListOrder}>Proceed</Button>
          <Button variant="contained" onClick={removeAllItems}>Clear Cart</Button>
        </>
      }
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    orderList: state.orderList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeItem: (orderList, componentId: number) => dispatch(deleteItemFromCart(orderList, componentId)),
    removeAllItems: () => dispatch(removeAllItem()),
    updateQuantity: (orderList, componentId, newQuantity) => dispatch(changeQuantity(orderList, componentId, newQuantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)