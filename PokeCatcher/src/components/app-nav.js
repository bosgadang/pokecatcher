class AppNav extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar bg-light">
        <div class="container-fluid navbar-brand fw-bold">
            <img src="../img/pokeball.png" alt="Logo" width="36" height="36" class="align-text-top">
            Pokemon Catcher
        </div>
    </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);
