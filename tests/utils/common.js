const fs = require('node:fs');
const path = require('node:path');
const XLSX = require('xlsx');

/** Read worksheet rows as objects keyed by the header row. */
function readExcelData(filePath, sheetName) {
	const resolvedPath = path.resolve(filePath);
	if (!fs.existsSync(resolvedPath)) {
		throw new Error(`Excel file not found: ${resolvedPath}`);
	}

	const workbook = XLSX.readFile(resolvedPath);
	const selectedSheet = sheetName || workbook.SheetNames[0];
	const worksheet = workbook.Sheets[selectedSheet];
	if (!worksheet) {
		throw new Error(`Worksheet not found: ${selectedSheet}`);
	}

	return XLSX.utils.sheet_to_json(worksheet, { defval: '' });
}

/** Get one data row from an Excel worksheet (rowIndex is zero-based). */
function getExcelRow(filePath, sheetName, rowIndex = 0) {
	const rows = readExcelData(filePath, sheetName);
	if (!Number.isInteger(rowIndex) || rowIndex < 0 || rowIndex >= rows.length) {
		throw new RangeError(`Excel data row index out of range: ${rowIndex}`);
	}
	return rows[rowIndex];
}

/** Sign in using credentials and selectors supplied by the caller. */
async function login(page, credentials, selectors) {
	if (!page || !credentials || !selectors) {
		throw new TypeError('login requires page, credentials, and selectors');
	}
	if (!credentials.username || !credentials.password) {
		throw new Error('Credentials must include username and password');
	}
	if (!selectors.username || !selectors.password || !selectors.submit) {
		throw new Error('Selectors must include username, password, and submit');
	}

	await page.locator(selectors.username).fill(String(credentials.username));
	await page.locator(selectors.password).fill(String(credentials.password));
	await page.locator(selectors.submit).click();
}

/** Load credentials from Excel and sign in. */
async function loginFromExcel(page, options) {
	const {
		filePath,
		sheetName,
		rowIndex = 0,
		selectors,
		usernameColumn = 'username',
		passwordColumn = 'password',
	} = options || {};

	if (!filePath) {
		throw new Error('loginFromExcel requires filePath');
	}
	const row = getExcelRow(filePath, sheetName, rowIndex);
	await login(page, {
		username: row[usernameColumn],
		password: row[passwordColumn],
	}, selectors);
}

module.exports = {
	readExcelData,
	getExcelRow,
	login,
	loginFromExcel,
};
