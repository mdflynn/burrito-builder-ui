import React, { Component } from "react";
import "./App.css";
import { getOrders, postOrder, deleteOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    getOrders()
      .then((data) => this.setState({ orders: data.orders }))
      .catch((err) => console.error("Error fetching:", err));
  }

  submitNewOrder = (order) => {
    postOrder(order)
    this.setState((prevState) => ({
      orders: [...prevState.orders, order],
    }));
  };

  deleteAnOrder = (id) => {
    deleteOrder(id);
    const updatedOrder = this.state.orders.filter(order => {
      return order.id !== id
    })
    this.setState({ orders: updatedOrder})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm data={this.submitNewOrder} />
        </header>

        <Orders delete={this.deleteAnOrder} orders={this.state.orders} />
      </main>
    );
  }
}

export default App;
