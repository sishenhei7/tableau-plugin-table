import './styles/app.scss';

class App {
  constructor() {
    this.test = true;
    this.init();
  }

  init() {
    this.test = true;
    this.testInit();
    console.log('init');
  }

  testInit() {
    const app = document.querySelector('#app');
    app.innerText = 'Hello World';
  }
}

window.onload = () => {
  window.YmTable = new App();
};
