import React, { useEffect, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Row } from 'primereact/row';
import { Button } from 'primereact/button';
import './CartTotal.css';

function CartTotal(props) {

const dataItems = [
 'tax'
]
const tax = 0.15
const taxText = <span className = "text-sm">Tax: { tax * 100 }% </span>;
const footer = `Total: ${ props.totalPrice + ( tax*props.totalPrice )}`

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={ dataItems } header='Cart Total' footer={ footer } >
        <Column field="tax" header={ taxText }></Column>
        </DataTable>

        <div className="grid align-items-center">
          <div className="col-12">
            <a href="http://localhost/munetsiblog/checkout/" className="text-center no-underline p-button-secondary font-bold">
              Proceed to checkout
              <i className="pi pi-chevron-right p-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CartTotal;
