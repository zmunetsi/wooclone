import React, { useEffect, useState,useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import CartTotal from '../carttotal/CartTotal';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';

import './Checkout.css';

import { getCartItems, removeFromCart } from '../../service/CartService';
import { login, logout, register } from '../../service/UserService';

function Checkout(props) {

  const payfastImage = `${plugin_url}/assets/images/payfast-image.JPG`
  const toast = useRef(null);
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loggedIn, setUseStatus] = useState(false)
  const [username, setUsername] = useState('')
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [showLoginMessage, setLoginShowMessage] = useState(false);
  const [formLoginData, setLoginFormData] = useState({});

  const showSuccess = (message, detail ) => {
    toast.current.show({ severity: 'success', summary: message, detail: detail, life: 3000 });
  }

  const showWarn = ( message, detail ) => {
    toast.current.show({ severity: 'warn', summary: message, detail: detail, life: 3000 });
  }

  useEffect(() => {

    const cartItems = getCartItems()
    const totalPrice = cartItems.reduce((acc, item) => acc + item.unitPrice, 0)
    setCartItems(cartItems)
    setTotalPrice(totalPrice)
    setUseStatus(is_user_logged_in)
    setUsername(user_name)

  }, [])

  const handleLogout = useCallback(( ) => {

    logout().then(response => {
      console.log(response )
      if (response.loggedout) {
        setUseStatus(false)
        showSuccess('You are now logged out.')
      } else {
        showWarn('OOps something went wrong.')
      }
    })

   

  }, [props.x]);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      streetAddress: '',
      city: null,
      accept: false
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.email) {
        errors.email = 'Email is required.';
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      }

      if (!data.accept) {
        errors.accept = 'You need to agree to the terms and conditions.';
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
      register(data, (response) => {
        if (response.status === 200) {
          props.history.push('/')
        }
      })

      formik.resetForm();
    }
  });

  const loginFormik = useFormik({
    initialValues: {

      username: '',
      password: ''
    },
    validate: (data) => {
      let errors = {};


      if (!data.username) {
        errors.username = 'Username is required.';
      }


      if (!data.password) {
        errors.password = 'Password is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      setLoginFormData(data);
      setLoginShowMessage(true);
      login(data).then(response => {
        if (response.loggedin) {
          setUseStatus(true)
          setUsername( data.username )
          showSuccess('Success, please proceed to checkout.')
        } else {
          showWarn('Wrong username or password. Please try again.')
        }
      })

      loginFormik.resetForm();
    }
  });

  const cities = [

    { name: "Johannesburg", code: "JHB" },
    { name: "Cape Town", code: "CPT" },
    { name: "Durban", code: "DUR" },
    { name: "East London", code: "EAL" },
    { name: "Port Elizabeth", code: "PLZ" },
    { name: "Pretoria", code: "PRY" },
  ]
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const isLoginFormFieldValid = (name) => !!(loginFormik.touched[name] && loginFormik.errors[name]);
  const getLoginFormErrorMessage = (name) => {
    return isLoginFormFieldValid(name) && <small className="p-error">{loginFormik.errors[name]}</small>;
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );


  if (loggedIn) {

    return (
      <div className="checkout-form">

        <Toast ref={toast} position="top-right"></Toast>
        <div className="grid">
          <div className="col-12 lg:col-6">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <h5 className="p-text-center">Welcome {username} | 
                <button onClick={ handleLogout } className="text-center p-button p-button-text font-bold">
                      Logout
                      <i className="pi pi-chevron-right p-2"></i>
                    </button>
                 </h5>
                <Image src={payfastImage} alt="payfast-image" />
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <InputText hidden id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                  <Button type="submit" label="Pay Now" className="p-button-primary p-mt-2" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-6">
            <React.Fragment>
              <Divider />
              <CartTotal title='Your Order' cartItems={cartItems} title='Your Order' totalPrice={totalPrice}></CartTotal>
            </React.Fragment>
          </div>
        </div>
      </div>
    );

  } else {

    return (
      <div className="checkout-form">
        <Toast ref={toast} position="top-right"></Toast>
        <div className="grid">
          <div className="col-12 lg:col-8">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <h5 className="p-text-center">Checkout</h5>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="p-field">
                    <span className="p-float-label">
                      <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                      <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                    </span>
                    {getFormErrorMessage('name')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <InputText id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('lastname') })} />
                      <label htmlFor="lastname" className={classNames({ 'p-error': isFormFieldValid('lastname') })}>Last Name*</label>
                    </span>
                    {getFormErrorMessage('lastname')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                      <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                    </span>
                    {getFormErrorMessage('email')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                        className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                      <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                    </span>
                    {getFormErrorMessage('password')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <InputTextarea id="street-address" name="streetAddress" value={formik.values.streetAddress} rows={3} cols={30} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('streetAddress') })} />
                      <label htmlFor="street-address" className={classNames({ 'p-error': isFormFieldValid('streetAddress') })}>Street Address*</label>
                    </span>
                    {getFormErrorMessage('streetAddress')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <Dropdown id="city" name="city" value={formik.values.city} onChange={formik.handleChange} options={cities} optionLabel="name" />
                      <label htmlFor="city">City</label>
                    </span>
                  </div>

                  <Button type="submit" label="Pay Now" className="p-mt-2" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-4">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <h5 className="p-text-center">Already have an account | Login</h5>
                <form onSubmit={loginFormik.handleSubmit} className="p-fluid">

                  <div className="p-field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText id="username" name="username" value={loginFormik.values.username} onChange={loginFormik.handleChange} className={classNames({ 'p-invalid': isLoginFormFieldValid('username') })} />
                      <label htmlFor="username" className={classNames({ 'p-error': isLoginFormFieldValid('username') })}>Username*</label>
                    </span>
                    {getLoginFormErrorMessage('username')}
                  </div>
                  <div className="p-field">
                    <span className="p-float-label">
                      <Password id="password" name="password" value={loginFormik.values.password} onChange={loginFormik.handleChange}
                        className={classNames({ 'p-invalid': isLoginFormFieldValid('password') })} />
                      <label htmlFor="password" className={classNames({ 'p-error': isLoginFormFieldValid('password') })}>Password*</label>
                    </span>
                    {getLoginFormErrorMessage('password')}
                  </div>
                  <Button type="submit" label="Login" className="p-button-secondary p-mt-2" />
                </form>
              </div>
            </div>
            <React.Fragment>
              <Divider />
              <CartTotal title='Your Order' cartItems={cartItems} title='Your Order' totalPrice={totalPrice}></CartTotal>
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }


}

export default Checkout;
if (document.getElementById('checkout')) {
  ReactDOM.render(<Checkout />, document.getElementById('checkout'));
}