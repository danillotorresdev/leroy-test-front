import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import BookModal from './BookModal';

import ActionCreators from '../redux/actionCreators';

class FormFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: 0,
      showModal: null,
      productsInCart: [],
    };

    this.handleModal = this.handleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const { loadProducts } = this.props;
    loadProducts();

    let livrosGuardados = localStorage.getItem('booksInCart');
    if (livrosGuardados) {
      livrosGuardados = JSON.parse(livrosGuardados);
      this.setState({
        productsInCart: livrosGuardados,
      });
    }
  }

  handleModal(index) {
    this.setState({
      modalActive: index,
      showModal: 'show',
    });
  }

  hideModal() {
    this.setState({
      modalActive: 0,
      showModal: null,
    });
  }

  handleSaveProductInCart(
    modalProductId,
    modalProductImage,
    modalProductInfo,
    modalProductPrice,
    modalProductTitle,
  ) {
    const { productsInCart } = this.state;
    const { saveProductsInCart } = this.props;
    const product = {
      id: modalProductId,
      image: modalProductImage,
      info: modalProductInfo,
      price: modalProductPrice,
      title: modalProductTitle,
    };
    productsInCart.push(product);
    saveProductsInCart({
      productsInCart,
    }, this.setState({
      modalActive: 0,
      showModal: null,
    }));
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    NotificationManager.success('Item salvo no carrinho :)');
  }

  render() {
    const { products } = this.props;
    const { modalActive, showModal } = this.state;

    let modalProductTitle;
    let modalProductInfo;
    let modalProductPrice;
    let modalProductImage;
    let modalProductId;
    if (products.data) {
      if (products.data[modalActive]) {
        modalProductId = products.data[modalActive].id;
        modalProductTitle = products.data[modalActive].name;
        modalProductInfo = products.data[modalActive].info;
        modalProductPrice = `${products.data[modalActive].price.to.integers},${products.data[modalActive].price.to.decimals}`;
        modalProductImage = products.data[modalActive].picture;
      }
    }
    return (
      <>
        <div className="container pt-4">
          <div className="row">
            {products.data.map(
              (product, index) => (
                <div role="presentation" key={product.id} className="col-md-3" onClick={() => this.handleModal(index)}>
                  <div className="card border-0" style={{ width: '100%' }}>
                    <img src={product.picture} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                    </div>
                  </div>
                </div>
              ),
            )}

          </div>
          <NotificationContainer />
        </div>
        <BookModal
          modalProductInfo={modalProductInfo}
          modalProductImage={modalProductImage}
          showModal={showModal}
          modalProductPrice={modalProductPrice}
          modalProductTitle={modalProductTitle}
          hideModal={() => this.hideModal()}
          handleSaveProductInCart={() => this.handleSaveProductInCart(
            modalProductId,
            modalProductImage,
            modalProductInfo,
            modalProductPrice,
            modalProductTitle,
          )}

        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(ActionCreators.getProductsRequest()),
  saveProductsInCart: productsInCart => dispatch(
    ActionCreators.saveProductsInCartSuccess(productsInCart),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
