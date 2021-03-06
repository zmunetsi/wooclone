import React, { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import CartTotal from '../carttotal/CartTotal';
import { OrderList } from 'primereact/orderlist';
import { Toast } from 'primereact/toast';

import './CartItems.css';

import { removeFromCart, getCartItems } from '../../service/CartService';

function CartItems(props) {

  const toast = useRef(null);
  const checkOutPage = `${site_url}/checkout`
  const productPage = `${site_url}/products`

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {

    const cartItems = getCartItems()
    const totalPrice = cartItems.reduce((acc, item) => acc + item.unitPrice, 0)
    setCartItems(cartItems)
    setTotalPrice(totalPrice)

  }, [])

  const showSuccess = (message, detail) => {
    toast.current.show({ severity: 'success', summary: message, detail: detail, life: 3000 });
  }

  const showWarn = (message, detail) => {
    toast.current.show({ severity: 'warn', summary: message, detail: detail, life: 3000 });
  }

  const handleButtonRemoveFromCart = useCallback((cartId) => {

    const cartItems = removeFromCart(cartId)

    const totalPrice = cartItems.reduce((acc, item) => acc + item.unitPrice, 0)
    setCartItems(cartItems)
    setTotalPrice(totalPrice)

    if (cartItems) {
      showSuccess('Product removed')
    } else {
      showWarn('Sorry, things did not work as expected.')
    }

  }, [props.x]);


  const itemTemplate = (item) => {
    return (
      <div className="product-item">
        <Toast ref={toast} position="top-right"></Toast>
        <div className="image-container">
          <img src={item.image} onError={(e) => e.target.src = '/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
        </div>
        <div className="product-list-detail">
          <h5 className="p-mb-2">{item.name}</h5>
          <i className="pi pi-tag product-category-icon"></i>
          <span className="product-category">{item.description}</span>
        </div>
        <div className="product-list-detail">
          <h6 className="p-mb-2">${item.unitPrice}</h6>
        </div>
        <div className="product-list-action">
          <i onClick={() => handleButtonRemoveFromCart(item.id)} className="pi pi-times" style={{ 'fontSize': '1.2em' }}></i>
        </div>
      </div>
    );
  }

  if (cartItems.length > 0) {

    return (
      <div className="orderlist-demo">
        <div className="card">
          <div className="grid align-items-center">
            <div className="col-12 lg:col-8">
              <OrderList value={cartItems} header="Cart List" listStyle={{ height: 'auto' }} dataKey="id"
                itemTemplate={itemTemplate} ></OrderList>
            </div>
            <div className="col-12 lg:col-4">
              <CartTotal cartItems={cartItems} title='Cart Total' totalPrice={totalPrice}></CartTotal>
              <React.Fragment>
                <div className="grid align-items-center">
                  <div className="col-12">
                    <a href={checkOutPage} className="text-center no-underline p-button-secondary font-bold">
                      Proceed to checkout
                      <i className="pi pi-chevron-right p-2"></i>
                    </a>
                  </div>
                </div>
              </React.Fragment>
            </div>
          </div>

        </div>
      </div>
    );

  } else {

    return (
      <a href={productPage} className="text-center no-underline p-button-secondary font-bold">
        No items in cart, go shopping
        <i className="pi pi-chevron-right p-2"></i>
      </a>
    );
  }


}

export default CartItems;
if (document.getElementById('cart-items')) {
  ReactDOM.render(<CartItems />, document.getElementById('cart-items'));
}