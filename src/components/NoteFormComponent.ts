import './CustomInputComponent';
import './CustomButtonComponent';

class NoteFormComponent extends HTMLElement {
  static observedAttributes = ['action-label', 'title', 'description'];
  actionLabel = '';
  title = '';
  description = '';
  newTitle = '';
  newDescription = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.render(shadow);
  }

  attributeChangedCallback(
    name: string,
    _: string | null,
    newValue: string | null,
  ) {
    if (name === 'action-label') {
      this.actionLabel = newValue || '';
      this.render(this.shadowRoot!);
    }

    if (name === 'title') {
      this.title = newValue || '';
      this.newTitle = this.title;
      this.render(this.shadowRoot!);
    }

    if (name === 'description') {
      this.description = newValue || '';
      this.newDescription = this.description;
      this.render(this.shadowRoot!);
    }
  }

  addEventListeners(shadow: ShadowRoot) {
    const title = shadow.querySelector('#title');
    if (title) {
      title.addEventListener('value-change', (e) => {
        e.stopPropagation();
        const customEvent = e as CustomEvent;
        this.newTitle = customEvent.detail;
      });
    }

    const cancelBtn = shadow.querySelector('.note__cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('cancel-changes');
        this.dispatchEvent(event);
      });
    }
    const body = shadow.querySelector('#body');
    if (body) {
      body.addEventListener('value-change', (e) => {
        e.stopPropagation();
        const customEvent = e as CustomEvent;
        this.newDescription = customEvent.detail;
      });
    }
    const saveBtn = shadow.querySelector('custom-button-component');
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('save-changes', {
          detail: {
            title: this.newTitle,
            description: this.newDescription,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `
    <style>

      .note {
        display: flex;
        flex-direction: column;
      }

      .note__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .note__action-label {
        line-height: 1.625rem;
        font-weight: 700;
        margin: 0;
      }

      .note__cancel {
        font-size: 0.875rem;
        color: var(--button-secondary);
        margin: 0;
        line-height: 1.5rem;
        align-self: center;
      }

      .note__title {
        height: 2.625rem;
      }

      .note__body {
        height: 13.125rem;
      }

      custom-button-component {
        align-self: flex-end;
        width: 4.375rem;
        height: 2.5rem;
      }

      .margin-x {
        margin-top: 0.375rem;
        margin-bottom: 0.375rem;
      }
    </style>`;
    const body = `
    <div class="note">
     <div class="note__header margin-x">
      <p class="note__action-label">${this.actionLabel}</p>
      <p class="note__cancel">Cancel</p>   
     </div>
     <custom-input-component class="note__title margin-x" id="title" value="${this.title}" placeholder="Note title"></custom-input-component>
     <custom-input-component class="note__body margin-x" id="body" value="${this.description}" placeholder="Your note" type="textarea"></custom-input-component>
     <custom-button-component variant="primary" class="margin-x">Save</custom-button-component>
    </div>
    `;

    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('note-form-component', NoteFormComponent);
