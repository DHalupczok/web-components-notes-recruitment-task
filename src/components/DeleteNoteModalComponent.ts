import '../components/CustomButtonComponent';
class DeleteNoteModalComponent extends HTMLElement {
  static observedAttributes = ['id'];
  id = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.render(shadow);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === 'id' && newValue) this.id = newValue;
    this.render(this.shadowRoot!);
  }

  addEventListeners(shadow: ShadowRoot) {
    const cancelButton = shadow.querySelector('.cancel-button');
    if (cancelButton) {
      cancelButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('delete-note-cancelled', {
          detail: this.id,
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }
    const deleteButton = shadow.querySelector('.delete-button');
    if (deleteButton) {
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('delete-note-confirmed', {
          detail: this.id,
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `<style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .modal__container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal__backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal {
        position: relative;
        background-color: white;
        padding: 1rem;
        border-radius: 1rem;
        z-index: 1001;
        margin-left: 0.75rem;
        margin-right: 0.75rem;
        padding: 1.5rem;
      }

      .modal__header {
        font-weight: 700;
        line-height: 1.875rem;
        margin-bottom: 1.5rem;
      }

      .modal__body {
        line-height: 1.625rem;
      }

      .modal__footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 1.5rem;  
      }

      custom-button-component {
        width: 50%;
        height: 2.5rem;
      }

      .cancel-button {
        margin-right: 0.5rem;
      }

      .delete-button {
        margin-left: 0.5rem;
      }
    </style>`;

    const body = `
    <div class="modal__container">
      <div class="modal__backdrop">
        <div class="modal">
          <div class="modal__header">Delete Note</div>
          <div class="modal__body">Are you sure you want to delete this note?</div>
          <div class="modal__footer">
           <custom-button-component class="cancel-button btn" variant="outline">Cancel</custom-button-component>
           <custom-button-component class="delete-button btn">Delete</custom-button-component>
          </div>
        </div>
      </div>
    </div>
    `;
    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('delete-note-modal-component', DeleteNoteModalComponent);
