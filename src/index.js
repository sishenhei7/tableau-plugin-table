import table from './components/table';
import { formatTableauData } from './utils/util';
import {
  getSheetByName,
  getDataFromSheet,
  registerEventsToSheet,
  unregisterEventsToSheet,
} from './utils/tableau';
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
    unregisterEventsToSheet();

    this.worksheet = getSheetByName(this.sheetName);

    getDataFromSheet(this.worksheet)
      .then((res) => {
        this.sheetData = res;

        const data = formatTableauData(this.sheetData);
        table.setState({
          data,
          sentenceField: 'Post',
          keywordsField: 'nlp_matched_key',
        });

        registerEventsToSheet(this.worksheet, () => {
          this.render();
        });
      });
  }
}

window.onload = () => {
  window.YmTable = new App();
};
