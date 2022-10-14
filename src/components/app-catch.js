import axios from 'axios';
import lodash from 'lodash';

class AppCatch extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  get count() {
    return this.getAttribute('count');
  }

  set count(value) {
    this.setAttribute('count', value);
  }

  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'count') {
      this.render();
      let btnCatch = this.shadow.querySelector('#btnCatch');
      btnCatch.addEventListener('click', this.random.bind(this));
      btnCatch.disabled = true;
      const pokemonModal = this.shadow.querySelector('#pokemonModal');
      showModal();
      function showModal() {
        setTimeout(() => {
          pokemonModal.style.display = 'flex';
          btnCatch.disabled = false;
        }, 6000);
      }

      const hideModal = () => {
        pokemonModal.style.display = 'none';
      };

      let btnClose = this.shadow.querySelector('#btnClose');
      btnClose.addEventListener('click', hideModal);

      const getPokemon = async () => {
        try {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${this.count}`
          );
          console.log(res.data);
          const pokemon = res.data;
          this._pokemonId = pokemon.id;
          this._pokemonName = pokemon.name;
          this._pokemonImg = pokemon.sprites.front_default;
          this._pokemonType = pokemon.types[0].type.name;
          console.log('Type', this._pokemonType);
          this._pokemonHeight = pokemon.height;
          this._pokemonWeight = pokemon.weight;
        } catch (error) {
          console.log(error);
        }
      };
      getPokemon();
    }
  }

  random() {
    this.count = _.floor(_.random(1, 1155));
  }

  connectedCallback() {
    this.render();
    let btnCatch = this.shadow.querySelector('#btnCatch');
    btnCatch.addEventListener('click', this.random.bind(this));
  }

  render() {
    this.shadow.innerHTML = `
    <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    .pokemon{
      display: flex;
      flex-direction: column;
    }
    .catch{
      display: flex;
      flex-direction: column;
    }

    .catch img {
      animation: rotate-in-up-left 1s ease, swing 2s ease 3;
      margin: 30px auto;
    }

    .catch button{
      width: 100px;
      padding: 10px 20px;
      margin: 30px auto;
      background-color: rgba(66,194,255,1);
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      transition: 0.3s;
    }

    .catch button:hover{
      background-color: rgba(133,244,255,1);
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

    @keyframes rotate-in-up-left {
      0% {
        transform-origin: left bottom;
        transform: rotate(90deg);
        opacity: 0;
      }
      20% {
        transform: rotate(75deg);
        opacity: 0.2;
      }
      40% {
        transform: rotate(60deg);
        opacity: 0.4;
      }
      60% {
        transform: rotate(35deg);
        opacity: 0.6;
      }
      80% {
        transform: rotate(30deg);
        opacity: 0.8;
      }
      100% {
        transform: rotate(15deg);
        opacity: 1;
      }
    }

    @keyframes swing {
      20% { transform: rotate(15deg); opacity: 0.2;}	
      40% { transform: rotate(-10deg); opacity: 0.4;}
      60% { transform: rotate(5deg); opacity: 0.6;}	
      80% { transform: rotate(-5deg); opacity: 0.8;}	
      100% { transform: rotate(0deg); opacity: 1;}
    }

    </style>

    <div id="pokemonModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>No.${this._pokemonId}</h3>
          <h3>${_.capitalize(this._pokemonName)}</h3>
        </div>
        <div class="modal-body">
          <img src="${this._pokemonImg}" alt="pokemon" width="200">
        </div>
        <div class="modal-footer">
          <h4>${_.capitalize('type')}: ${_.capitalize(this._pokemonType)}</h4>
          <div class="pokemon-status">
            <span>${_.capitalize('height')}: ${this._pokemonHeight} feet</span>
            <span>${_.capitalize('weight')}: ${this._pokemonWeight} lbs</span>
          </div>
          <button id ="btnClose">X</button>
        </div>
      </div>
    </div>

    <div class="catch">
      <img src="../img/drawing.svg" alt="pokeball" width="200" class="pokeball" id="pokeball">
      <button id="btnCatch" class="btn-catch">Catch</button>
    </div>
      `;
  }
}
customElements.define('app-catch', AppCatch);
