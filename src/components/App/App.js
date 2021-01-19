import React, { Component } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
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

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm data={this.submitNewOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}

export default App;
