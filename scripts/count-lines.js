const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens-no-short-long-fixed-names.json');
// const inputFilePath = path.join(__dirname, 'dialogue.json');
const outputFilePath = path.join(__dirname, './characters.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

const characterCounts = {};
const characterJson = [];

function normalizeName(str) {
	// const [firstName] = str.split(' ');
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

for (const item of jsonData) {
	const character = item.character;
	characterCounts[character] = (characterCounts[character] || 0) + 1;
}

// Sort characters by line count (descending)
const sortedCharacters = Object.entries(characterCounts)
	.sort(([, countA], [, countB]) => countB - countA);

for (const [name, lines] of sortedCharacters) {
	characterJson.push({
		name: normalizeName(name),
		lines,
	});
}
// for (const [character, count] of sortedCharacters) {
// 	if (count < 11) {
// 		console.log(`${character},`);
// 	}
// }

// for (const item of jsonData) {
//   if (item.dialogue.length > 60 && item.dialogue.length < 200 )
//   newData.push({
//     character: item.character,
//     dialogue: item.dialogue,
//   });
// }

fs.writeFileSync(outputFilePath, JSON.stringify(characterJson, null, 2));
console.log('JSON file created successfully!');