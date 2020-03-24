import dialog from './components/dialog';
import tableauUtils from './utils/tableau';
import './styles/dialog.scss';

/* global tableau */
class Dialog {
  constructor() {
    this.init();
  }

  init() {
    tableau.extensions.initializeDialogAsync().then((openPayload) => {
      this.render();
      dialog.dialogItem().init();
      console.log('openPayload', openPayload);
    });
  }

  render() {
    console.log('----------render------------');
    const sheetNameList = tableauUtils.getSheetNameList();
    const sheetName = tableau.extensions.settings.get('sheetName');

    console.log('sheetNameList', sheetNameList, sheetName);

    if (sheetName) {
      const worksheet = tableauUtils.getSheetByName(sheetName);

      tableauUtils.getDataFromSheet(worksheet, { maxRows: 1 })
        .then((res) => {
          const fieldNameList = res.columns.map(column => column.fieldName);

          dialog.setState({
            fieldNameList,
            sheetNameList,
            freshFn: () => this.render(),
          });
        });
    } else {
      dialog.setState({
        sheetNameList,
        freshFn: () => this.render(),
      });
    }
  }
}

window.onload = () => {
  window.YmDialog = new Dialog();
};
