import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, index) => {
    return (
      <div key={index} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
        <button onClick={() => props.delete(order.id)}>Cancel</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;