import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './CartTotal.css';

function CartTotal(props) {

  const dataItems = [
    'tax'
  ]
  const tax = 0.15
  const taxText = <span className="text-sm">Tax: {tax * 100}% </span>;
  const footer = `Total: ${props.totalPrice + (tax * props.totalPrice)}`

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable value={dataItems} header={props.title} footer={footer} >
          <Column field="tax" header={taxText}></Column>
        </DataTable>
      </div>
    </div>
  );

}

export default CartTotal;
