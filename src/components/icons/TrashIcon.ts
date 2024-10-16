class TrashIcon extends HTMLElement {
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
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2.25 14.25H9.75V4.25H2.25V14.25ZM0.375 2.58333V1.33333H3.16667L4 0.5H8L8.83333 1.33333H11.625V2.58333H0.375ZM2.25 15.5C1.91667 15.5 1.625 15.375 1.375 15.125C1.125 14.875 1 14.5833 1 14.25V3H11V14.25C11 14.5833 10.875 14.875 10.625 15.125C10.375 15.375 10.0833 15.5 9.75 15.5H2.25ZM2.25 14.25H9.75H2.25Z" fill="#3B3C3E"/>
        </svg>`;
  }
}

customElements.define('trash-icon', TrashIcon);
