import table from './components/table';
import { formatTableauData } from './utils/helpers';
import tableauUtils from './utils/tableau';
import './styles/app.scss';

/* global tableau */
class App {
  constructor() {
    this.sheetName = null;
    this.sheetData = null;
    this.worksheet = null;

    this.init();
  }

  init() {
    // ToDo: 自定义 sheetName
    this.sheetName = 'Brand thread';

    tableau.extensions.initializeAsync()
      .then(() => {
        this.render();
      });
  }

  render() {
    // 每次渲染的时候重新绑定事件，防止用户中途添加 sheet 等操作
    tableauUtils.unregisterEventsToSheet();

    this.worksheet = tableauUtils.getSheetByName(this.sheetName);

    tableauUtils.getDataFromSheet(this.worksheet)
      .then((res) => {
        this.sheetData = res;

        const data = formatTableauData(this.sheetData);
        table.setState({
          data,
          sentenceField: 'Post',
          keywordsField: 'nlp_matched_key',
        });

        tableauUtils.registerEventsToSheet(this.worksheet, () => {
          this.render();
        });
      });
  }
}

window.onload = () => {
  window.YmTable = new App();
};
