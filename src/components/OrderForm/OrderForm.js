import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    // this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleIngredientChange = (event) => {
    event.preventDefault();
    const { name } = event.target;
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, name]
    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.ingredients.length || !this.state.name) {
      alert ("Please complete the form")
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={this.handleIngredientChange}>
          {ingredient}
        </button>
      )
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
