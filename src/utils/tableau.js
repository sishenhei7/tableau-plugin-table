/* global tableau */
let unregisterSettingsEventListener = null;
let unregisterFilterEventListener = null;
let unregisterMarkSelectionEventListener = null;
// let unregisterParameterEventListener = null;

function getSheetNameList() {
  return tableau.extensions.dashboardContent.dashboard.worksheets.map(sheet => (sheet.name));
}

function getSheetByName(sheetName) {
  const { worksheets } = tableau.extensions.dashboardContent.dashboard;

  return worksheets.find(sheet => sheet.name === sheetName);
}

function getDataFromSheet(worksheet, limit) {
  return worksheet.getUnderlyingDataAsync({ maxRows: limit });
}

function registerSheetEvents(worksheet, cb) {
  if (typeof cb === 'function') {
    unregisterFilterEventListener = worksheet.addEventListener(
      tableau.TableauEventType.FilterChanged,
      filterEvent => cb(filterEvent),
    );

    unregisterMarkSelectionEventListener = worksheet.addEventListener(
      tableau.TableauEventType.MarkSelectionChanged,
      markSelectionEvent => cb(markSelectionEvent),
    );
  }
}

function unregisterSheetEvents() {
  if (unregisterFilterEventListener) {
    unregisterFilterEventListener();
  }

  if (unregisterMarkSelectionEventListener) {
    unregisterMarkSelectionEventListener();
  }
}

function registerSettingsEvents(cb) {
  if (typeof cb === 'function') {
    unregisterSettingsEventListener = tableau.extensions.settings.addEventListener(
      tableau.TableauEventType.SettingsChanged,
      settingsEvent => cb(settingsEvent),
    );
  }
}

function unregisterSettingsEvents() {
  if (unregisterSettingsEventListener) {
    unregisterSettingsEventListener();
  }
}

function registerParametersEvents(cb) {
  if (typeof cb === 'function') {
    tableau.extensions.dashboardContent.dashboard.getParametersAsync().then((parameters) => {
      parameters.forEach((parameter) => {
        parameter.addEventListener(tableau.TableauEventType.ParameterChanged, (filterEvent) => {
          console.log('filterEvent', filterEvent);
          cb(filterEvent);
        });
      });
    });
  }
}

function dialogconfigure() {
  const input = '';
  const popupUrl = `${window.location.origin}/tableau-plugin-table/dialog.html`;

  tableau.extensions.ui.displayDialogAsync(popupUrl, input, { height: 350, width: 600 }).then((closePayload) => {
    // The close payload is returned from the popup extension via the closeDialog method.
    console.log('closePayload', closePayload);
  }).catch((error) => {
    // One expected error condition is when the popup is closed by the user (meaning the user
    // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
    switch (error.errorCode) {
      case tableau.ErrorCodes.DialogClosedByUser:
        console.log('Dialog was closed by user');
        break;
      default:
        console.error(error.message);
    }
  });
}

export default {
  getSheetNameList,
  getSheetByName,
  getDataFromSheet,
  registerSheetEvents,
  unregisterSheetEvents,
  registerSettingsEvents,
  unregisterSettingsEvents,
  registerParametersEvents,
  dialogconfigure,
};
