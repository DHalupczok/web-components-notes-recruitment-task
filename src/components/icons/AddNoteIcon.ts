class AddNoteIcon extends HTMLElement {
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
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M9.25 12.425H8.75V12.925V15.65H8.25V12.925V12.425H7.75H5V11.925H7.75H8.25V11.425V8.675H8.75V11.425V11.925H9.25H12V12.425H9.25ZM10.775 5.65V1.5V1H10.275H2H1.5V1.5V6.15V18.5V19H2H15H15.5V18.5V6.15V5.65H15H10.775ZM15 19.5H2C1.74128 19.5 1.5161 19.409 1.30355 19.1964C1.09101 18.9839 1 18.7587 1 18.5V1.5C1 1.24128 1.09101 1.0161 1.30355 0.803553C1.5161 0.591009 1.74128 0.5 2 0.5H10.8179L16 5.68211V18.5C16 18.7587 15.909 18.9839 15.6964 19.1964C15.4839 19.409 15.2587 19.5 15 19.5Z" fill="black" stroke="#1B1C1E"/>
        </svg>`;
  }
}

customElements.define('add-note-icon', AddNoteIcon);
