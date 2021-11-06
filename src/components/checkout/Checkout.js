import React, { useEffect, useState, useCallback } from 'react';
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

import './Checkout.css';

import { getCartItems } from '../../service/CartService';

function Checkout(props) {

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {

    const cartItems = getCartItems()
    const totalPrice = cartItems.reduce((acc, item) => acc + item.unitPrice, 0)
    setCartItems(cartItems)
    setTotalPrice(totalPrice)

  }, [])

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

      formik.resetForm();
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


  if (true) {

    return (
      <div className="checkout-form">
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

                  <Button type="submit" label="Pay Now" className="primary p-mt-2" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-4">
            <div className="p-d-flex p-jc-center">
              <div className="card">
                <h5 className="p-text-center">Already have an account | Login</h5>
                <form onSubmit={formik.handleSubmit} className="p-fluid">

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
                  <Button type="submit" label="Login" className="p-button-secondary p-mt-2" />
                </form>
              </div>
            </div>
            <React.Fragment>
              <Divider />
              <CartTotal title='Your Order' cartItems={cartItems} title='Your Order' totalPrice= { totalPrice }></CartTotal>
            </React.Fragment>
          </div>
        </div>
      </div>
    );

  } else {

    return (
      <div className="checkout-form">
        <div className="grid align-items-center">
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
            <CartTotal cartItems={cartItems} title='Your Order' totalPrice={totalPrice}></CartTotal>
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