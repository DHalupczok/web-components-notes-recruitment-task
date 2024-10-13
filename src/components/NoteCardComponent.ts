import '../components/icons/EditNoteIcon';
import '../components/icons/TrashIcon';
import { formatDate } from '../utils/formatDateUtil';
class NoteCardComponent extends HTMLElement {
  static observedAttributes = ['id', 'title', 'description', 'createdAt'];
  id = '';
  title = '';
  description = '';
  createdAt = new Date();

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
    console.warn('Wywołuje się attribute change callback', name, newValue);
    if (name === 'id' && newValue) this.id = newValue;
    if (name === 'title' && newValue) {
      console.log('Wjechało nowy title', newValue);
      this.title = newValue;
    }
    if (name === 'description' && newValue) this.description = newValue;
    if (name === 'createdAt' && newValue) this.createdAt = new Date(newValue);
    this.render(this.shadowRoot!);
  }

  render(shadow: ShadowRoot) {
    const styles = `<style>
      .note {
      display: flex;
      flex-direction: column;
      }

      .note__title-container {
      display: flex;
      flex-direction: row;
      }

      .note__title-value {
      
      }

      
    </style>`;
    const body = `
      <div class="note">
        <div class="note__title-container">
        <p>${this.title}</p>
        <edit-note-icon></edit-note-icon>
        <trash-icon></trash-icon>
        </div>
        <p class="note__body">${this.description}</p>
        <p class="note__created-at>${formatDate(this.createdAt)}</p>"
      </div>`;

    shadow.innerHTML = `${styles} ${body}`;
  }
}

customElements.define('note-card-component', NoteCardComponent);
