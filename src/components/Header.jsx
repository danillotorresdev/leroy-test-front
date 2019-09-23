import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionCreators from '../redux/actionCreators';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let produtosGuardados = localStorage.getItem('productsInCart');
    if (produtosGuardados) {
      const { saveProductsInCart } = this.props;
      produtosGuardados = JSON.parse(produtosGuardados);
      saveProductsInCart({
        productsInCart: produtosGuardados,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem('productsInCart');
  }

  render() {
    const { products } = this.props;
    const { productsInCart } = products;
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="w-25">
              <a className="navbar-brand" href="/"><img className="img-fluid logo" src="/book.png" alt="logo" /></a>
            </div>
            {!window.location.href.includes('login')
              && (
                <div className="d-flex justify-content-between w-75 align-items-center">
                  <div>
                    <Link className="ml-5 text-secondary" to="/">Home</Link>
                  </div>
                  <div>
                    <Link to="/carrinho" className="btn btn-primary">
                      Carrinho (
                      {productsInCart.length}
                      )
                    </Link>
                    <button className="btn btn-light ml-2" type="button" onClick={this.logout}>Sair</button>
                  </div>
                </div>
              )

            }
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(ActionCreators.getProductsRequest()),
  saveProductsInCart: productsInCart => dispatch(ActionCreators.saveProductsInCartSuccess(productsInCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
