import Vue from 'vue';
import YmTable from './YmTable.vue';

class MyTable {
  constructor() {
    this.table = null;
    this.init();
  }

  init() {
    const app = document.querySelector('#app');
    const wrapper = document.createElement('div');
    wrapper.id = 'ym-table-wrapper';
    app.appendChild(wrapper);

    const Table = Vue.extend(YmTable);
    this.table = new Table().$mount('#ym-table-wrapper');
  }

  setState(data) {
    // 这里没有清除以前的数据，或许有坑，暂无解决方案
    // 目前是正常的
    Object.keys(data).forEach((item) => {
      this.table[item] = data[item];
    });
  }
}

export default new MyTable();
