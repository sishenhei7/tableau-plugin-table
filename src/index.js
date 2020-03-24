import table from './components/table';
import { formatTableauData } from './utils/helpers';
import tableauUtils from './utils/tableau';
import './styles/app.scss';

/* global tableau */
class App {
  constructor() {
    this.init();
  }

  init() {
    tableau.extensions.initializeAsync({ configure: tableauUtils.dialogconfigure })
      .then(() => {
        this.render();

        tableauUtils.registerSettingsEvents(() => this.render());

        tableauUtils.registerParametersEvents(() => this.render());
      });
  }

  render() {
    // 每次渲染的时候重新绑定事件，防止用户中途添加 sheet 等操作
    tableauUtils.unregisterSheetEvents();

    const sheetName = tableau.extensions.settings.get('sheetName');

    if (sheetName) {
      const worksheet = tableauUtils.getSheetByName(sheetName);

      tableauUtils.getDataFromSheet(worksheet)
        .then((res) => {
          const data = formatTableauData(res);
          const sentenceField = tableau.extensions.settings.get('sentenceField');
          const keywordsField = tableau.extensions.settings.get('keywordsField');

          table.setState({
            data,
            sentenceField,
            keywordsField,
          });

          tableauUtils.registerSheetEvents(worksheet, () => this.render());
        });
    }
  }
}

window.onload = () => {
  window.YmApp = new App();
};
