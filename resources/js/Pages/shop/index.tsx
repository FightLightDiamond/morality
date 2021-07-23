import React, { useState } from "react"
import Layout from "../../components/common/layout"
import { connect } from "react-redux"
import { useAppSelector } from "../../stores/hooks"
import Drawer from "@material-ui/core/Drawer"
import { LinearProgress } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"
import Item from "./components/item/item"
import { useProductsQuery } from "../../services/productService"

//styles
import { Wrapper, StyledButton } from "../../App.styles"
import { TCartItem } from "../../types/TCartItem"
import Cart from "./components/cart/cart"

// interface Props {
//
// }

const NotePage: React.FC<any> = (
  {}
) => {
  const { data, error, isLoading } = useProductsQuery("")
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<TCartItem[]>([])

  const getTotalItems = (items: TCartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)

  const handleAddToCart = (clickedItem: TCartItem) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as TCartItem[])
    )
  }

  /**
   * View render
   */
  if (isLoading) return (<LinearProgress />)

  if (error) return <div>Something went wrong</div>

  return (
    <Layout title={"Shop"}>
      <Wrapper>
        <Drawer anchor={"right"} open={cartOpen} onClose={() => setCartOpen(false)}>
          {/* Cart */}
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        {/* Add to cart */}
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color={"error"}>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        {/* List product */}
        <Grid container spacing={3}>
          {
            data?.map(
              (item: any) =>
                <Grid item key={item.id} xs={12} sm={4}>
                  <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
            )
          }
        </Grid>
      </Wrapper>
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
const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(NotePage)
