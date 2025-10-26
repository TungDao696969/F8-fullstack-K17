let tableHtml = `<table border="1" width="100%" cellpadding="0" cellspacing="0">`;
tableHtml += `<tr>`;
for (let i = 1; i <= 5; i++) {
  tableHtml += `<th>${i}</th>`;
}
tableHtml += `</tr>`;

tableHtml += `<tr>`;
for (let col = 1; col <= 5; col++) {
    let n = col;
    tableHtml += `<td>`;
    for (let i = 1; i <= 10; i++) {
        tableHtml += `${n} x ${i} = ${n * i} <br>`;
    }
    tableHtml += `</td>`;
}
tableHtml += `</tr>`;

tableHtml += `<tr>`;
for (let i = 6; i <= 10; i++) {
  tableHtml += `<th>${i}</th>`;
}
tableHtml += `</tr>`;
tableHtml += `<tr>`;
for (let col = 6; col <= 10; col++) {
    let n = col;
    tableHtml += `<td>`;
    for (let i = 1; i <= 10; i++) {
        tableHtml += `${n} x ${i} = ${n * i}<br>`;
    }
    tableHtml += `</td>`;
}
tableHtml += `</tr>`;

tableHtml += `</table>`;

document.body.innerHTML = tableHtml;
