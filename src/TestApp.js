import React, {Component} from 'react';

import NavTabs from './components/NavTabs/NavTabs'

import axios from 'axios';

import './App.css';


class App extends Component {

  componentDidMount() {
    axios.get('https://api.invoice-app.2muchcoffee.com/api/products')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    // console.log(this.props)
    return (
      <div className="App">
        <NavTabs />

        {/*{this.props.products.map(product => (*/}
        {/*  <div>{product.name}</div>*/}
        {/*))}*/}
      </div>
    );
  }}


export default App;