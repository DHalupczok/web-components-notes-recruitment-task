import './CustomInputComponent';
import './CustomButtonComponent';
import './icons/InfoIcon';
import './icons/AddNoteIcon';

class NoNotesComponent extends HTMLElement {
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
      form.addEventListener('save-changes', () => {
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
        flex-direction: column;
        align-items: center;
      }

      .w-100 {
        width: 100%;
      }
      
      .add-new-note-btn {
        height: 2.5rem;
      }

      info-icon {
         height: 3.25rem;
         width: 3.25rem;
         margin: 0.75rem;
         margin-top: 3rem;
      }

      .headline {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.875rem;
      margin: 0;
      }

      custom-button-component {
      height: 2.5rem;
      }

      .button-slot {
      display: flex;
      flex-direction: row;

      }

      add-note-icon {
      width: 1.25rem;
      height: 1rem;
      margin-right: 0.5rem;
      align-self: center;
      }

      .add-note-label {
      font-weight: 500;
      line-height: 1.5rem;
      }

    </style>`;

    const body = this.isInEditMode
      ? `
    <note-form-component class="w-100" action-label="Add new note"></note-form-component>
    `
      : `
      <info-icon></info-icon>
      <p class="headline">No notes yet</p>
      <p>Add a note to keep track of your learnings.</p>
      <custom-button-component variant="outline" class="add-new-note-btn"><div class="button-slot"><add-note-icon></add-note-icon><div class="add-note-label">Add Note</div><button-slot></custom-button-component>
      `;

    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('no-notes-component', NoNotesComponent);
