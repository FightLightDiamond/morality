import React, {useState} from "react"
import Layout from "../../components/common/layout"
import { connect } from "react-redux"
import { useAppSelector } from "../../stores/hooks"
import Drawer from "@material-ui/core"
import { LinearProgress } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"
import Item from "./components/item/item"
import {useProductsQuery} from "../../services/productService"

//styles
import {Wrapper} from "../../App.styles"
import {TCartItem} from "../../types/TCartItem"

// interface Props {
//
// }

const NotePage: React.FC<any> = (
  {

  }
) => {
  const { data, error, isLoading } = useProductsQuery("")

  const getTotalItems = () => null
  const handleAddToCart = (clickedItem: TCartItem) => null
  const handleRemoveFromCart = () => null

  if(isLoading) return (<LinearProgress />)

  if(error) return <div>Something went wrong</div>

  return (
    <Layout title={"Shop"}>
      <Grid container spacing={3}>
        {
          data?.map((item: any) => <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>)
        }
      </Grid>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return {
    // notes: state.notes.items,
    // count: state.counter.value
  }
}

/**
 * Tự động dispatch
 * const addNote = (note: string) => {
 *  dispatch(addNote(note))
 * }
 */
const mapActionToProps = {

}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
