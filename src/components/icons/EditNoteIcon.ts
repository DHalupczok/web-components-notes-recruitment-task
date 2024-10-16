class EditNoteIcon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
        <style>
          :host {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.875 7.10417L13.3958 5.625L14 5.02083C14.1111 4.90972 14.2569 4.85417 14.4375 4.85417C14.6181 4.85417 14.7639 4.90972 14.875 5.02083L15.4792 5.625C15.5903 5.73611 15.6458 5.88194 15.6458 6.0625C15.6458 6.24305 15.5903 6.38889 15.4792 6.5L14.875 7.10417ZM8 12.5V11.0208L12.5 6.52083L13.9792 8L9.47917 12.5H8ZM0.5 8.125V6.875H6.75V8.125H0.5ZM0.5 4.6875V3.4375H10.2917V4.6875H0.5ZM0.5 1.25V0H10.2917V1.25H0.5Z" fill="#3B3C3E"/>
        </svg>`;
  }
}

customElements.define('edit-note-icon', EditNoteIcon);
