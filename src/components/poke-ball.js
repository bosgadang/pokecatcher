class PokeBall extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  get throw() {
    return this.getAttribute('throw');
  }

  set throw(value) {
    this.setAttribute('throw', value);
  }

  static get observedAttributes() {
    console.log('observed data');
    return ['throw'];
  }

  set pokemon(result) {
    console.log('show result');
    this._pokemon = result;
    this._pokemonName = this._pokemon.name;
    this._pokemonImg = this._pokemon.sprites.front_default;
    this._pokemonHeight = this._pokemon.weight;
    this._pokemonWeight = this._pokemon.height;
    this.render();
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'throw') {
      this.render();
      let pokeball = this.shadow.getElementById('pokeball');
      pokeball.this.increment.bind(this);
      pokeball.classList.add('catch-animation');
      console.log('throw');
    }
    // if (this.throw === '1') {
    //   console.log('satu');
    // } else {
    //   let pokeball = this.shadow.getElementById('pokeball');
    //   this._pokeball = pokeball;
    //   this._pokeball.classList.add('catch-animation');
    //   console.log('bukan satu');
    //   this.render();
    // }
  }

  increment() {
    this.throw++;
  }

  render() {
    this.shadow.innerHTML = `
    
      <style>
    .catch{
        display: flex;
    }

    .catch img{
        padding: 10px 20px;
        margin: 30px auto;
    }

    .catch-animation{
        animation: rotate-in-up-left 1s ease, swing 2s ease 3;
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
    <div class="catch">
      <img src="../img/drawing.svg" alt="pokeball" width="200" class="pokeball" id="pokeball">
    </div>
    
    `;
  }
}

customElements.define('poke-ball', PokeBall);
