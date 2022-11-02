// let todolist = [
//     { description: 'Tidy your room', date: new Date('2022-11-15') },
//     { description: 'Vacuum the living room', date: new Date('2022-11-02') },
//     { description: 'Take out the trash', date: new Date('2022-10-07') }
// ];
//
// function generateTableHead(table, data) {
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for (let key of data) {
//         let th = document.createElement("th");
//         let text = document.createTextNode(key);
//         th.appendChild(text);
//         row.appendChild(th);
//     }
// }
//
// function generateTable(table, data) {
//     for (let element of data) {
//         let row = table.insertRow();
//         for (key in element) {
//             let cell = row.insertCell();
//             let text = document.createTextNode(element[key]);
//             cell.appendChild(text);
//         }
//     }
// }
//
// let table = document.querySelector("table");
// let data = Object.keys(todolist[0]);
//
// generateTableHead(table, data);
// generateTable(table, todolist);
//
//
// let mainTable = (table, data) => {
//
// };