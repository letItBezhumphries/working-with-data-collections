const fs = require('fs');

let file1Text = fs.readFileSync('./file.csv', { encoding: 'utf-8' });
let file2Text = fs.readFileSync('./file2.csv', { encoding: 'utf-8' });

/*
Each row is an object in the list
Part 1: Refactoring Old Code

*/
const refactoredCreateTable = function (filetxt) {
  // split out the \n or \\n into an array of rows to handle both files
  let rows = filetxt.split(/\\n|\n/);

  let innerHtml = '<table>';

  var row;
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split(',');
    console.log('rowColums:', cols);
    row = '<tr>';
    for (let j = 0; j < cols.length; j++) {
      row = row + `<td>${cols[j]}</td>`;
      console.log('row:', row);
    }
    row = row + '</tr>';

    innerHtml += row;
  }

  innerHtml = innerHtml + '</table>';
  console.log('innerHtml:', innerHtml);
  return innerHtml;
};

// refactoredCreateTable(file1Text);
// refactoredCreateTable(file2Text);

/*
Expanding functionality:

*/
const expandedCreateTable = function (filetxt) {
  let result = [];

  // split out the \n or \\n into an array of rows
  let text = filetxt.split(/\\n|\n/);

  // store the number of columns in each row
  const columns = text[0].split(',').length;

  // isolate and store the properties keys for each row

  // isolate the list of objects
  const entries = text.slice(1);

  // iterate over each row / object in entries
  for (let i = 0; i < columns; i++) {
    // store the current row split into array of property values for each object
    let currentRow = entries[i].split(',');

    console.log('currentRow:', currentRow);

    result.push(currentRow);
  }

  return result;
};

// expandedCreateTable(file1Text);
// expandedCreateTable(file2Text);

/*
Part 3: Transforming Data
*/
const transformingData = function (filetxt) {
  let result = [];

  // split out the \n or \\n into an array of rows
  let text = filetxt.split(/\\n|\n/);

  // store the number of columns in each row
  const columns = text[0].split(',').length;

  // isolate and store the properties keys for each row
  const keys = text[0].split(',');

  // isolate the list of objects
  const entries = text.slice(1);

  // iterate over each row / object in entries
  for (let i = 0; i < entries.length; i++) {
    // store the current row split into array of property values for each object
    let currentRow = entries[i].split(',');

    let obj = {};
    // iterate over each column in columns
    for (let j = 0; j < columns; j++) {
      let key = keys[j].toLowerCase();
      let value = currentRow[j];
      obj[key] = value;
    }
    result.push(obj);
  }

  console.log('result:', result);
  return result;
};

// transformingData(file1Text);
// transformingData(file2Text);

/**
 * Sorting and Manipulating data
 */
const manipulatingData = function (filetxt) {
  let data = transformingData(filetxt);

  // 1. Remove the last element from the sorted array.
  let sortedData = data.sort((a, b) => a.id - b.id);
  let lastRow = sortedData.pop();

  // 2. Insert the following object at index 1:
  sortedData.splice(1, 0, {
    id: '48',
    name: 'Barry',
    occupation: 'Runner',
    age: '25',
  });

  // 3 Add the following object to the end of the array:
  sortedData.push({ id: '7', name: 'Bilbo', occupation: 'None', age: '111' });

  /* 4. use the values of each object within the array and the array’s length property 
  to calculate the average age of the group. This calculation should be accomplished using a loop.
  */
  let sum = 0;
  for (let i = 0; i < sortedData.length; i++) {
    sum += parseInt(sortedData[i].age);
  }
  // console.log('sum:', sum, 'avg:', Math.floor(sum / sortedData.length));
  const averageAge = sum / sortedData.length;
  // console.log('averageAge:', averageAge);
  return averageAge;
};

manipulatingData(file1Text);
// manipulatingData(file2Text);

/**
 * 5. Full Circle
 */
const transformBackIntoCSV = function (data) {
  let result = '';

  // iterate over the data objects
  for (let i = 0; i < data.length; i++) {
    // check if its the first index in data
    if (i === 0) {
      // if its the first index use the keys
      result += Object.keys(data[i]).join(',') + '\n';
      // otherwise use the values
    } else {
      result += Object.values(data[i]).join(',') + '\n';
    }
  }

  // write the result into newFile.csv
  fs.writeFileSync('newFile.csv', result);

  return result;
};

const transformedData = transformingData(file1Text);

transformBackIntoCSV(transformedData);
