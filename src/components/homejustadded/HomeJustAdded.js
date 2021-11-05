import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeJustAdded.css';

import { getProducts } from '../../service/ProductService';
import { addtoCart, getCartItems } from '../../service/CartService';

function HomeJustAdded(props) {

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartIds, setCartIds] = useState([])

  useEffect(() => {
    let cartItems = getCartItems()
    let cartIds = cartItems.map(item => item.id)
    setCartItems(cartItems)
    setCartIds(cartIds)

    getProducts()
      .then(items => {
        setProducts(items)

      })

  }, [])

  const handleButtonAddCart = useCallback((product) => {

    let cartItems = addtoCart(product)
    let cartIds = cartItems.map(item => item.id)
    setCartItems(cartItems)
    setCartIds(cartIds)


  }, [props.x]);


  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  if (cartItems.length > 0) {

    return (
      <Card
      >
        <div className="grid align-items-center">
          <div className="col-10">
            <h1 className="lg:text-center text-primary">Just added</h1>
          </div>
          <div className="col-2">
            <a href="http://localhost/munetsiblog/cart/" className="text-center no-underline p-button-secondary font-bold">
              <i className="pi pi-shopping-cart p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.5rem' }}><Badge value={cartItems.length} severity="danger" ></Badge></i> View cart
              <i className="pi pi-chevron-right p-2"></i>
            </a>
          </div>
        </div>
        <Slider {...settings}
          className="pb-4">

          {products.map(product => (

            <div
              className="col-12 lg:col-3">
              <img style={{ maxWidth: "100%" }}
                className="product-image" src={product.image} alt="product 1" />
              <div className="grid surface-200 p-0 m-0">
                <div className="col-12">
                  <h3 className="text-center">{product.name} </h3>
                </div>
                <div className="grid col-12 justify-content-center">
                  <div className="col-6 text-center">
                    <span className="text-xs">{product.currency}{product.unitPrice}</span>
                  </div>
                  <div className="col-6 text-center">
                    {
                      cartIds.includes(product.id) ? <Button label="Added" className="p-button-xs p-button-outlined p-button-secondary" />
                        : <Button onClick={() => handleButtonAddCart(product)} label="Add to Cart" className="p-button-xs p-button-outlined p-button-primary" />
                    }
                  </div>
                </div>
              </div>
            </div>

          ))}


        </Slider >
      </Card >
    );

  } else {
    return (
      <Card
      >
        <div className="grid align-items-center">
          <div className="col-10">
            <h1 className="lg:text-center text-primary">Just added</h1>
          </div>
          <div className="col-2">
            <a href="http://localhost/munetsiblog/cart/" className="text-center no-underline p-button-secondary font-bold">
              <i className="pi pi-shopping-cart p-mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '1.5rem' }}></i> View cart
              <i className="pi pi-chevron-right p-2"></i>
            </a>
          </div>
        </div>
        <Slider {...settings}
          className="pb-4">

          {products.map(product => (

            <div
              className="col-12 lg:col-3">
              <img style={{ maxWidth: "100%" }}
                className="product-image" src={product.image} alt="product 1" />
              <div className="grid surface-200 p-0 m-0">
                <div className="col-12">
                  <h3 className="text-center">{product.name} </h3>
                </div>
                <div className="grid col-12 justify-content-center">
                  <div className="col-6 text-center">
                    <span className="text-xs">{product.currency}{product.unitPrice}</span>
                  </div>
                  <div className="col-6 text-center">
                    {
                      cartIds.includes(product.id) ? <Button label="Added" className="p-button-xs p-button-outlined p-button-secondary" />
                        : <Button onClick={() => handleButtonAddCart(product)} label="Add to Cart" className="p-button-xs p-button-outlined p-button-primary" />
                    }
                  </div>
                </div>
              </div>
            </div>

          ))}


        </Slider >
      </Card >
    );

  }

}

export default HomeJustAdded;
if (document.getElementById('home-just-added')) {
  ReactDOM.render(<HomeJustAdded />, document.getElementById('home-just-added'));
}