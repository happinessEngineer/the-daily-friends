const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens-no-short-long.json');
const outputFilePath = path.join(__dirname, './dialogue-no-tiny-chars-no-parens-no-short-long-fixed-names.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

function normalizeName(str) {
	switch (str) {
		case 'Rachel Green':
			return 'Rachel'
		case 'Ross Geller':
			return 'Ross'
		case 'Chandler Bing':
			return 'Chandler'
		case 'Monica Geller':
			return 'Monica'
		case 'Joey Tribbiani':
			return 'Joey'
		case 'Phoebe Buffay':
			return 'Phoebe'
		case 'Janice Litman Goralnik':
			return 'Janice'
		case 'Carol Willick':
			return 'Carol'
		default:
			break;
	}
	return str;
}


const newData = [];

for (const item of jsonData) {
  newData.push({
    character: normalizeName(item.character),
    dialogue: item.dialogue,
  });
}

fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
console.log('JSON file created successfully!');

