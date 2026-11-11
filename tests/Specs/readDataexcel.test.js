import {test, expect} from '@playwright/test';
import xlsx from 'xlsx';
import {LoginPage} from '../../pageObjects/login.page';

let rows;

function readRows() {
  const workbook = xlsx.readFile('tests/data/data.xls');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(worksheet);
}
test('Read data from excel sheet', async({}) => {
    rows = readRows();
    console.log("data111 : " + rows[0].UserName, rows[0].Password);
});
test('reading userName and pasword rows wise and try to login into', async({page}) => {
    rows = readRows();
    const dataJson = JSON.stringify(rows);
    console.log("data: " + dataJson);
     let parsedData= JSON.parse(dataJson);
    //console.log("data: " + JSON.stringify(dataJson));    ;
    console.log("data111 : " + parsedData[0].UserName, parsedData
        [0].Password);
    const loginPage = new LoginPage(page);
    await loginPage.launchUrl();
    console.log("data111 : " + rows[0].UserName, rows
        [0].Password);
    await loginPage.login(rows[0].UserName, rows[0].Password);
})

