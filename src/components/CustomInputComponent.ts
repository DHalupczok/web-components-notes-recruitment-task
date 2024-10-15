class CustomInputComponent extends HTMLElement {
  static observedAttributes = ['value', 'placeholder', 'disabled', 'type'];
  disabled = false;
  value = '';
  placeholder = '';
  type = 'text';

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
    if (name === 'disabled' && oldValue !== newValue) {
      this.disabled = newValue !== null;
      this.render(this.shadowRoot!);
    }

    if (name === 'placeholder' && oldValue !== newValue) {
      this.placeholder = newValue || '';
      this.render(this.shadowRoot!);
    }

    if (name === 'value' && oldValue !== newValue) {
      this.value = newValue || '';
      this.render(this.shadowRoot!);
    }
    if (name === 'type' && oldValue !== newValue) {
      this.type = newValue || 'text';
      this.render(this.shadowRoot!);
    }
  }

  addEventListeners(shadow: ShadowRoot) {
    const input =
      shadow.querySelector('input') || shadow.querySelector('textarea');
    if (input) {
      input.addEventListener('input', (e) => {
        e.stopPropagation();
        const input = e.target as HTMLInputElement;
        const event = new CustomEvent('value-change', { detail: input.value });
        this.dispatchEvent(event);
      });
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `
    <style>
     div:has(input), div:has(textarea) {
      height: 100%;
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      font-weight: var(--font-bolder);
      font-family: var(--font-family);
      border: none;
      background-color: var(--secondary);
      color: var(--text-secondary);
    }

    div:has(input:focus-visible), div:has(textarea:focus-visible) {
      background-color: var(--primary);
      outline: 1px solid var(--text-secondary);
    }

    input, textarea {
      flex: 1  1 auto;
      background-color: var(--secondary);
      color: var(--text-secondary);
      border: none;
    }


    input:focus-visible, textarea:focus-visible {
      background-color: transparent;
      outline: none
    }

    slot {
      flex: 0 1 auto;
    }

    </style>`;
    const disabled = this.disabled ? 'disabled' : '';
    const getInput = () => {
      if (this.type === 'text')
        return `<input type='text' value='${this.value}' placeholder='${this.placeholder}'  ${disabled}/>`;
      if (this.type === 'textarea')
        return `<textarea placeholder='${this.placeholder}'  ${disabled}/>${this.value}</textarea>`;
    };
    const body = `<div>
    <slot name='prepend-element'></slot>
    ${getInput()}
    </div>`;
    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('custom-input-component', CustomInputComponent);
