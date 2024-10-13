class NoteIcon extends HTMLElement {
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
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.40636 17.677V18.41C1.18802 18.1882 1.09595 17.955 1.09595 17.677V2.32284C1.09595 2.01916 1.19532 1.77787 1.41482 1.55837C1.63925 1.33394 1.87479 1.2395 2.15636 1.2395H10.1415L14.9272 6.02516V17.677C14.9272 17.9586 14.8328 18.1941 14.6083 18.4185C14.3888 18.638 14.1475 18.7374 13.8439 18.7374H2.15636C1.87835 18.7374 1.64522 18.6454 1.42334 18.427H2.15636H13.8439H14.5939V17.677V6.58534V5.83534H13.8439H10.2626V2.32284V1.57284H9.51261H2.15636H1.40636V2.32284V6.58534V17.677Z" fill="#1B1C1E" stroke="#1B1C1E" stroke-width="1.5"/>
        </svg>


      `;
  }
}

customElements.define('note-icon', NoteIcon);
