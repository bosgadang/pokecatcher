import moment from 'moment';
import lodash from 'lodash';
class PokeLogs extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  set pokemon(result) {
    this._pokemon = result;
    this._pokemonName = this._pokemon.name;
    // this._pokemonImg = this._pokemon.sprites.front_default;
    // this._pokemonHeight = this._pokemon.height;
    // this._pokemonWeight = this._pokemon.weight;
    this._pokemonType = this._pokemon.types[0].type.name;
    setTimeout(() => {
      this.render();
    }, 6000);
    this.render();
  }

  render() {
    this.shadow.innerHTML += `
    <style>
    .poke-success {
        color: green;
    }
    .pokemon-name {
      font-weight: bold;
    }
    </style>

    <div class="poke-success">
    <span>Success [${moment().format(
      'MMMM Do YYYY, h:mm:ss'
    )}] : You have got <span class="pokemon-name">${_.capitalize(
      this._pokemonName
    )}.</span> ${_.capitalize('type')} : ${_.capitalize(
      this._pokemonType
    )}.</span>
      </div>
    `;
  }

  renderError() {
    this.shadow.innerHTML += `
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

customElements.define('poke-logs', PokeLogs);
