import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ActionCreators from '../redux/actionCreators';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsInCart: [],
      name: '',
      email: '',
      purchase: false,
      hide: '',
      valorTotal: 0,
      novoValorTotal: 0,
      produtosAdicionados: [],
      removidos: [],
    };

    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.backToHome = this.backToHome.bind(this);
    this.handleSumPrices = this.handleSumPrices.bind(this);
  }

  componentDidMount() {
    const { loadBooks } = this.props;
    loadBooks();

    let produtosGuardados = localStorage.getItem('productsInCart');
    if (produtosGuardados) {
      produtosGuardados = JSON.parse(produtosGuardados);
      console.log(produtosGuardados);
      this.setState({
        productsInCart: produtosGuardados,
      });
    }
  }

  handleSumPrices() {
    const { productsInCart } = this.state;
    const prices = productsInCart.map(product => product.price.replace('.', '').replace(',', '.'));


    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += parseFloat(prices[i]);
    }
    this.setState({
      valorTotal: total,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePurchase(e) {
    const { email, name } = this.state;
    e.preventDefault();
    if (email && name) {
      this.setState({
        purchase: true,
      });
      NotificationManager.success('Seu pedido foi concluído com sucesso. Agradeço a compra do livro');
      localStorage.removeItem('productsInCart');
    } else {
      NotificationManager.error('Voce precisa preencher as informações para realizar essa compra');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  backToHome() {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }

  addProduct(priceToAdd) {
    const { valorTotal, novoValorTotal } = this.state;

    const handlePrice = priceToAdd.replace('.', '').replace(',', '.');
    const priceFloat = parseFloat(handlePrice);

    this.setState({
      produtosAdicionados: { ...this.state.produtosAdicionados, priceFloat },
      novoValorTotal: novoValorTotal ? novoValorTotal + priceFloat : valorTotal + priceFloat,
    });
  }

  removeProduct(priceToRemove) {
    const { valorTotal, novoValorTotal } = this.state;
    const handlePrice = priceToRemove.replace('.', '').replace(',', '.');
    const priceFloat = parseFloat(handlePrice);

    this.setState({
      novoValorTotal: novoValorTotal ? novoValorTotal - priceFloat : valorTotal - priceFloat,
    });
  }

  render() {
    const {
      productsInCart,
      purchase,
      hide,
      valorTotal,
      novoValorTotal,
    } = this.state;

    if (productsInCart) {
      setTimeout(() => {
        this.handleSumPrices();
      }, 1000);
    }

    return (
      <div className="container">
        <div className="row justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <h3>Seu Carrinho </h3>
            {productsInCart.length === 0
              ? <p className="m-0 pl-3 text-info">Você nāo tem items adicionados no carrinho</p>
              : <p className="m-0 pl-3 text-info">{`Você escolheu ${productsInCart.length} produtos`}</p>
            }
          </div>
          <div>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Finalizar Compra</button>
          </div>
        </div>
        <div className="container pt-4">
          <div className="row">

            {productsInCart.map(
              product => (
                <div role="presentation" key={product.id} className="col-md-3">
                  <div className="card border-0" style={{ width: '100%' }}>
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-title">{product.price}</p>
                      <div className="">
                        <p>Quantidade</p>
                        {console.log(this.state.adicionados)}
                        <p>1</p>
                        <p>Adicionar </p>
                        <button onClick={() => this.addProduct(product.price)}>+</button>
                        <p>Remover</p>
                        <button onClick={() => this.removeProduct(product.price)}>-</button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}

          </div>
        </div>
        <div className="container">
          <div className="row">
            <h1>{`Total: ${novoValorTotal ? novoValorTotal.toFixed(2) : valorTotal.toFixed(2)}`}</h1>

          </div>
        </div>

        <div className={`modal fade ${hide}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Finalizar compra</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="container">
                <div className="row p-3">
                  <form className="w-100">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nome</label>
                      <input onChange={this.handleName} required type="text" className="form-control" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Data de aniversario</label>
                      <InputMask className="form-control" mask="99/99/9999" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input onChange={this.handleEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    {purchase
                      ? <buttom onClick={this.backToHome} className="btn btn-success" data-dismiss="modal" aria-label="Close">Voltar ao início</buttom>
                      : <button type="submit" className="btn btn-primary" onClick={this.handlePurchase}>Finalizar compra</button>
                    }
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  loadBooks: () => dispatch(ActionCreators.getBooksRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
