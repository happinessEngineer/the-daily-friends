const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'friends_season_NUMBER.json'); // Replace with the actual path to your text file
const outputFilePath = path.join(__dirname, './dialogue.json');

const jsonData = [];

function padNumber(num) {
  return num < 10 ? '0' + num : num.toString();
}


for (let i = 1; i <= 10; i++) {
  const thisFilename = inputFilePath.replace('NUMBER', padNumber(i));
  console.log(thisFilename);
  const fileContent = JSON.parse(fs.readFileSync(thisFilename, 'utf-8'));
    fileContent.episodes.forEach(element => {
      element.scenes.forEach(scene => {
        scene.utterances.forEach(utterance => {
        // console.log(utterance.transcript, utterance.speakers);
        if (utterance.speakers.length === 1) {
          jsonData.push({ character: utterance.speakers[0], dialogue: utterance.transcript });
        }
      });    
    });
  });
}

fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
console.log('JSON file created successfully!');