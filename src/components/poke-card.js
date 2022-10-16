import moment from 'moment';
import lodash from 'lodash';
class PokeCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  set card(result) {
    this._card = result;
    this._cardId = this._card.id;
    this._cardName = this._card.name;
    this._cardImg = this._card.sprites.front_default;
    this._cardType = this._card.types[0].type.name;
    this._cardHeight = this._card.height;
    this._cardWeight = this._card.weight;

    this.render();
    this._cardPokemon = this.shadow.getElementById('pokemonModal');
    this._cardPokemon.style.display = 'flex';
    // setTimeout(() => {
    //   this.render();
    // }, 6000);
  }

  render() {
    this.shadow.innerHTML = `
    <style>
    * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    }
    

    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
    }

    .modal-header{
      display: flex;
      justify-content: space-around;
      padding: 5px;
      background: rgb(66,194,255);
      background: linear-gradient(45deg, rgba(66,194,255,1) 0%, rgba(133,244,255,1) 80%, rgba(133,244,255,1) 100%); 
      border-radius: 25px 25px 0px 0px;
    }
    
    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: rgb(239,255,253);
      background: radial-gradient(circle, rgba(239,255,253,1) 0%, rgba(184,255,249,1) 20%, rgba(239,255,253,1) 100%);  
      margin: 15% auto;
      border-radius: 25px;
      border: 1px solid #888;
      width: 300px;
      height: 500px;
      text-align: center;
      box-shadow: 5px 10px 20px 5px rgba(184,255,249,0.2);
      transition: 0.3s;
    }

    .modal-content:hover{
      box-shadow: 10px 20px 30px 10px rgba(133,244,255,0.2);
      transform: scale(1.1);
    }
      

    .modal-content img {
      border-image: white;
    }

    .modal-footer{
      padding: 20px 20px 0px 20px;
      background: rgb(66,194,255);
      background: linear-gradient(180deg, rgba(66,194,255,1) 0%, rgba(133,244,255,1) 69%, rgba(66,194,255,1) 100%); 
      border-radius: 0px 0px 25px 25px;
    }

    .modal-footer button{
      width: 50px;
      padding: 5px 5px;
      margin: 30px auto;
      background-color: rgba(239,255,253,1);
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      transition: 0.3s;
    }

    .modal-footer button:hover{
      background-color: rgba(219,235,233,1);
    }

    .pokemon-status{
      margin: 5px;
      display: flex;
      justify-content: space-around;
    }

    .modal-content img {
      margin: 0 auto;
    }
    
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
    </style>


    <div id="pokemonModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>No.${this._cardId}</h3>
          <h3>${_.capitalize(this._cardName)}</h3>
        </div>
        <div class="modal-body">
          <img src="${this._cardImg}" alt="pokemon" width="200">
        </div>
        <div class="modal-footer">
          <h4>${_.capitalize('type')}: ${_.capitalize(this._cardType)}</h4>
          <div class="pokemon-status">
            <span>${_.capitalize('height')}: ${this._cardHeight} feet</span>
            <span>${_.capitalize('weight')}: ${this._cardWeight} lbs</span>
          </div>
          <button id ="btnClose" type="button">X</button>
        </div>
      </div>
    </div>
    `;

    this.shadow
      .querySelector('#btnClose')
      .addEventListener('click', (event) => {
        const closeModal = this.shadow.querySelector('#pokemonModal');
        closeModal.style.display = 'none';
      });
  }

  renderError() {
    this.shadow.innerHTML = `
    <style>
    .poke-fail {
        color: red;
    }
    </style>
    
    <div class="poke-fail">
    <p>Fail [${moment().format(
      'MMMM Do YYYY, h:mm:ss'
    )}] : Pokemon has lost.</p>
      </div>
    `;
  }
}

customElements.define('poke-card', PokeCard);
