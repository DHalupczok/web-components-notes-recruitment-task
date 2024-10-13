class MagnifyingGlassIcon extends HTMLElement {
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
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.9 18.9751L10.325 12.4001C9.825 12.8334 9.24167 13.1709 8.575 13.4126C7.90833 13.6543 7.2 13.7751 6.45 13.7751C4.65 13.7751 3.125 13.1501 1.875 11.9001C0.625 10.6501 0 9.14176 0 7.3751C0 5.60843 0.625 4.1001 1.875 2.8501C3.125 1.6001 4.64167 0.975098 6.425 0.975098C8.19167 0.975098 9.69583 1.6001 10.9375 2.8501C12.1792 4.1001 12.8 5.60843 12.8 7.3751C12.8 8.09176 12.6833 8.78343 12.45 9.4501C12.2167 10.1168 11.8667 10.7418 11.4 11.3251L18 17.8751L16.9 18.9751ZM6.425 12.2751C7.775 12.2751 8.925 11.7959 9.875 10.8376C10.825 9.87926 11.3 8.7251 11.3 7.3751C11.3 6.0251 10.825 4.87093 9.875 3.9126C8.925 2.95426 7.775 2.4751 6.425 2.4751C5.05833 2.4751 3.89583 2.95426 2.9375 3.9126C1.97917 4.87093 1.5 6.0251 1.5 7.3751C1.5 8.7251 1.97917 9.87926 2.9375 10.8376C3.89583 11.7959 5.05833 12.2751 6.425 12.2751Z" fill="#5B5C5E"/>
        </svg>`;
  }
}

customElements.define('magnifying-glass-icon', MagnifyingGlassIcon);
