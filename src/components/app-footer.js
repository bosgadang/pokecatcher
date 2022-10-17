class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar bg-light">
          <div class="container-fluid navbar-brand fw-bold">

              <span class="d-flex m-auto">&#169; Copyright Bosgadang 2022</span>
          </div>
      </nav>`;
  }
}

customElements.define('app-footer', AppFooter);
