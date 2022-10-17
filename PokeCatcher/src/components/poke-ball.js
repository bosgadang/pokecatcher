class PokeBall extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set pokemon(result) {
    this.render();
    const throwPokeball = this.shadow.querySelector('#pokeball');
    throwPokeball.classList.add('catch-animation');
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
      <img src="../img/pokeball.png" alt="pokeball" width="200" class="pokeball" id="pokeball">
    </div>
    `;
  }
}

customElements.define('poke-ball', PokeBall);
