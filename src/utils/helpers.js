/* eslint-disable no-self-compare */
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
      // 把数字字符串转化为数字
      const val = Number(item[index].value);
      row[columnName] = val !== val ? item[index].value : val;
    });

    result.push(row);
  });


  console.log('formatTableauData >> after >> ', result);
  return result;
}
