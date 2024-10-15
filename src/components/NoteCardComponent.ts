import '../components/icons/EditNoteIcon';
import '../components/icons/TrashIcon';
import { Note } from '../model/note.model';
import { formatDate } from '../utils/formatDateUtil';
class NoteCardComponent extends HTMLElement {
  static observedAttributes = ['id', 'title', 'description', 'createdAt'];
  id = '';
  title = '';
  description = '';
  createdAt = new Date();
  inEditMode = false;

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
    if (name === 'title' && newValue) this.title = newValue;
    if (name === 'description' && newValue) this.description = newValue;
    if (name === 'createdAt' && newValue) this.createdAt = new Date(newValue);
    this.render(this.shadowRoot!);
  }

  toggleEditMode() {
    this.inEditMode = !this.inEditMode;
    this.render(this.shadowRoot!);
  }

  addEventListeners(shadow: ShadowRoot) {
    const editButton = shadow.querySelector('edit-note-icon');
    if (editButton) {
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleEditMode();
      });
    }
    const deleteButton = shadow.querySelector('trash-icon');
    if (deleteButton) {
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const event = new CustomEvent('delete-note', { detail: this.id });
        this.dispatchEvent(event);
      });
    }

    const noteForm = shadow.querySelector('note-form-component');
    if (noteForm) {
      noteForm.addEventListener('cancel-changes', (e) => {
        e.stopPropagation();
        this.toggleEditMode();
      });
      noteForm.addEventListener('save-changes', (e) => {
        e.stopPropagation();
        const saveChangesEvent = e as CustomEvent;
        const { title, description } = saveChangesEvent.detail;
        const updatedNote = new Note(
          title,
          description,
          this.createdAt,
          this.id,
        );
        const updateNoteEvent = new CustomEvent('update-note', {
          detail: updatedNote,
        });
        this.dispatchEvent(updateNoteEvent);
        this.toggleEditMode();
      });
    }
  }

  render(shadow: ShadowRoot) {
    const styles = `<style>
      .note {
        display: flex;
        flex-direction: column;
        padding: 0.375rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.07);
      }

      .note__title-container {
        display: flex;
        flex-direction: row;
      }

      .note__title {
         flex-grow: 1;
         font-size: 0.875rem;
         margin: 0;
         font-weight: 700;
         color: var(--text-primary);
      }

      edit-note-icon, trash-icon {
        width: 1.25rem;
        height: 1.25rem;
        margin-left: 0.125rem;
        margin-right: 0.125rem;
      }
      .note__body {
        font-size: 0.875rem;
        line-height: 1.5rem;
      }

      .note__created-at {
        font-size: 0.75rem;
        color: var(--text-secondary);
        line-height: 1.5rem;
        margin: 0;
      }

    </style>`;

    const body = this.inEditMode
      ? `
    <note-form-component class="w-100" action-label="Edit note" title="${this.title}" description="${this.description}"></note-form-component>
    `
      : `
      <div class="note">
        <div class="note__title-container">
        <p class="note__title">${this.title}</p>
        <edit-note-icon></edit-note-icon>
        <trash-icon></trash-icon>
        </div>
        <p class="note__body">${this.description}</p>
        <p class="note__created-at">${formatDate(this.createdAt)}</p>
      </div>`;

    shadow.innerHTML = `${styles} ${body}`;
    this.addEventListeners(shadow);
  }
}

customElements.define('note-card-component', NoteCardComponent);
