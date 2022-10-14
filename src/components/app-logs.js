import moment from 'moment';

class AppLogs extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <style>
    .logs {
        max-height: 300px;
        overflow-y: scroll;
    }
    </style>
    <div class="logs" id="log">
    <p>Logs: ${moment().format('LLL')} : You have got a Pikachu</p>
    <p>Logs: ${moment().format('LLL')} : You have got a Pikachu</p>
    <p>Logs: ${moment().format('LLL')} : You have got a Pikachu</p>
    <p>Logs: ${moment().format('LLL')} : You have got a Pikachu</p>
    <p>Logs: ${moment().format('LLL')} : You have got a Pikachu</p>
    </div>
    `;
  }
}

customElements.define('app-logs', AppLogs);
