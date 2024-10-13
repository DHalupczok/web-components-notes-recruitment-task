class CustomButtonComponent extends HTMLElement {
  static observedAttributes = ['variant'];
  variant: 'primary' | 'outline' = 'primary';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.render(shadow);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === 'variant' && oldValue !== newValue) {
      this.variant = newValue as 'primary' | 'outline';
      this.render(this.shadowRoot!);
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `<style>
      button {
      height: 100%;
      width: 100%;
        border-radius: var(--border-radius);
        font-weight: var(--font-bolder);
        font-family: var(--font-family);
        border: none;
      }

      button.primary {
        background-color: var(--button-primary);
        color: var(--primary);
      }

      button.outline {
        background-color: transparent;
        border: 2px solid var(--button-primary);
        color: var(--button-primary);
      }
    </style>`;

    const body =
      this.variant === 'primary'
        ? `<button class='primary'><slot></slot></button>`
        : `<button class='outline'><slot></slot></button>`;

    shadow.innerHTML = `${styles} ${body}`;
  }
}

customElements.define('custom-button-component', CustomButtonComponent);
