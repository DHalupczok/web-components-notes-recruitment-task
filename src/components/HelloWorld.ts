class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
    <style>
      .btn-success {
  background-color: var(--button-primary);
}
    </style>
    
    <p>HelloWorld</p>

    `;
  }

  connectedCallback() {
    console.log('Custom hello world element added to page.');
  }
}

customElements.define('hello-world', HelloWorld);
