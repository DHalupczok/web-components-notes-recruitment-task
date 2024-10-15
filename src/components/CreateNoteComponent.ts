import './CustomInputComponent';
import './CustomButtonComponent';

class CreateNoteComponent extends HTMLElement {
  isInEditMode = false;
  toggleEditMode() {
    this.isInEditMode = !this.isInEditMode;
    this.render(this.shadowRoot!);
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.render(shadow);
  }

  addEventListeners(shadow: ShadowRoot) {
    const newNoteBtn = shadow.querySelector('.add-new-note-btn');
    if (newNoteBtn) {
      newNoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleEditMode();
      });
    }

    const form = shadow.querySelector('note-form-component');
    if (form) {
      form.addEventListener('save-changes', (e) => {
        this.toggleEditMode();
      });
      form.addEventListener('cancel-changes', () => {
        this.toggleEditMode();
      });
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `
    
    <style>
      :host {
        display: flex;
      }
      .w-100 {
        width: 100%;
      }
      .add-new-note-btn {
        height: 2.5rem;
      }

    </style>`;

    const body = this.isInEditMode
      ? `
    <note-form-component class="w-100" action-label="Add new note"></note-form-component>
    `
      : `<custom-button-component class="add-new-note-btn w-100" id='add-new-note'>Add New</custom-button-component>`;

    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('create-note-component', CreateNoteComponent);
