import React, {Component} from 'react';

import NavTabs from './components/NavTabs/NavTabs'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from './store/actions/products';

import './App.css';


class App extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  }

  render () {
    console.log(this.props)
  return (
    <div className="App">
        <NavTabs />

      {this.props.products.map(product => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchProducts
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
