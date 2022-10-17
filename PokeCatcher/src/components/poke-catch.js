class PokeCatch extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return _.random(1, 898);
  }

  render() {
    this.shadow.innerHTML = `
    <style>

    .catch{
      display: flex;
      flex-direction: column;
    }

    .btn-wrapper{
        display: flex;
    }

    .btn-catch{
        width: 100px;
        padding: 10px 20px;
        margin: 30px auto;
        background-color: rgba(66,194,255,1);
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        transition: 0.3s;
      }
  
      .btn-catch{
        background-color: rgba(133,244,255,1);
      }
  
    </style>
      <div class="catch">
      <button type="submit" class="btn-catch" id="btnCatch" onclick="let btnCatch = this;this.disabled = true; setTimeout (() => {(this.disabled = false)}, 7000);">Catch</button>
      </div>
    `;
    this.shadow
      .querySelector('#btnCatch')
      .addEventListener('click', this._clickEvent);
  }
}

customElements.define('poke-catch', PokeCatch);
