import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

import './Checkout.css';

import { getProducts } from '../../service/ProductService';
import { addtoCart, getCartItems } from '../../service/CartService';

function Checkout(props) {

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  const [cities1, setCities1] = useState([]);
  const [cities2, setCities2] = useState([]);
  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  let states = [
    { name: 'Arizona', code: 'Arizona' },
    { name: 'California', value: 'California' },
    { name: 'Florida', code: 'Florida' },
    { name: 'Ohio', code: 'Ohio' },
    { name: 'Washington', code: 'Washington' }
  ];

  const onCityChange1 = (e) => {
    let selectedCities = [...cities1];

    if (e.checked)
      selectedCities.push(e.value);
    else
      selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setCities1(selectedCities);
  }

  const onCityChange2 = (e) => {
    let selectedCities = [...cities2];

    if (e.checked)
      selectedCities.push(e.value);
    else
      selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setCities2(selectedCities);
  }

  const onStateChange = (e) => {
    setSelectedState(e.value);
  }

  return (
    <div>

      <h5>Checkout</h5>
      <form action = "https://sandbox.payfast.co.za" className="p-fluid">
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="firstname6">Firstname</label>
            <InputText id="firstname6" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="lastname6">Lastname</label>
            <InputText id="lastname6" type="text" />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="address">Address</label>
            <InputTextarea id="address" type="text" rows="4" />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="city">City</label>
            <InputText id="city" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="state">State</label>
            <Dropdown inputId="state" value={selectedState} options={states} onChange={onStateChange} placeholder="Select" optionLabel="name" />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="zip">Zip</label>
            <InputText id="zip" type="text" />
          </div>
        </div>

        <div className="p-field p-mt-3">
          <Button type="submit" label="Checkout" />
        </div>

      </form>

    </div>
  )


}

export default Checkout;
if (document.getElementById('checkout')) {
  ReactDOM.render(<Checkout />, document.getElementById('checkout'));
}