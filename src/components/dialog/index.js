import Vue from 'vue';
import YmDialog from './YmDialog.vue';

class MyDialog {
  constructor() {
    this.dialog = null;
    this.init();
  }

  init() {
    const app = document.querySelector('#dialog');
    const wrapper = document.createElement('div');
    wrapper.id = 'ym-dialog-wrapper';
    app.appendChild(wrapper);

    const Dialog = Vue.extend(YmDialog);
    this.dialog = new Dialog().$mount('#ym-dialog-wrapper');
  }

  dialogItem() {
    console.log('this.dialog', this.dialog);
    return this.dialog;
  }

  setState(data) {
    // 这里没有清除以前的数据，或许有坑，暂无解决方案
    // 目前是正常的
    Object.keys(data).forEach((item) => {
      if (this.dialog[item] !== data[item]) {
        this.dialog[item] = data[item];
      }
    });
  }
}

export default new MyDialog();
