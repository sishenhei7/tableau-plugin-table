/* global tableau */
// let unregisterSettingsEventListener = null;
let unregisterFilterEventListener = null;
let unregisterMarkSelectionEventListener = null;
// let unregisterParameterEventListener = null;

export function getSheetByName(sheetName) {
  const { worksheets } = tableau.extensions.dashboardContent.dashboard;

  return worksheets.find(sheet => sheet.name === sheetName);
}

export function getDataFromSheet(worksheet, limit) {
  return worksheet.getUnderlyingDataAsync({ maxRows: limit });
}

export function registerEventsToSheet(worksheet, cb) {
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

export function unregisterEventsToSheet() {
  if (unregisterFilterEventListener) {
    unregisterFilterEventListener();
  }

  if (unregisterMarkSelectionEventListener) {
    unregisterMarkSelectionEventListener();
  }
}
