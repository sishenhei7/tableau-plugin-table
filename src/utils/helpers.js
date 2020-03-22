export function test() {
  return 1 + 1;
}

export function formatTableauData(tableauData) {
  console.log('formatTableauData >> before >> ', tableauData);

  const result = [];
  const { columns, data } = tableauData;
  const columnNames = columns.map(column => column.fieldName);

  data.forEach((item) => {
    const row = {};

    columnNames.forEach((columnName, index) => {
      row[columnName] = item[index].value;
    });

    result.push(row);
  });


  console.log('formatTableauData >> after >> ', result);
  return result;
}
