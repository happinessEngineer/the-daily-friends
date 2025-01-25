function AnswerButton({ character, isCorrect, isSelected, onClick, showResult }) {
    let buttonClass = "answer-button w-full p-4 text-white rounded-lg box-border flex items-center relative ";
    
    if (showResult) {
        if (isCorrect) {
            buttonClass += isSelected ? "bg-green-500 correct-answer burst-effect" : "bg-green-500";
        } else if (isSelected && !isCorrect) {
            buttonClass += "bg-gray-700 outline outline-2 outline-red-500";
        } else {
            buttonClass += "bg-blue-500";
        }
    } else {
        buttonClass += "bg-blue-500";
    }

    const successPhrases = [
        "Pivot!", "How you doin’?", "I KNOW!", "Could I BE any more excited?", "Unagi",
        "Stop the Madness!", "That is brand new information!", "Oh. My. God.", "I knew it!",
        "Yeah, baby!",
    ];
    const buttonText = (showResult && isCorrect && isSelected) 
        ? successPhrases[Math.floor(Math.random() * successPhrases.length)]
        : character;

    return (
        <button 
            key={character}
            data-name="answer-button"
            className={buttonClass}
            onClick={onClick}
            disabled={showResult}
        >
            <span className="flex-1 text-center">{buttonText}</span>
            {character.toLowerCase() === 'phoebe' && 
                <img src="character-images/phoebe.png" alt="Jerry" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'chandler' && 
                <img src="character-images/chandler.png" alt="George" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'rachel' && 
                <img src="character-images/rachel.png" alt="George" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'ross' && 
                <img src="character-images/ross.png" alt="George" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'monica' && 
                <img src="character-images/monica.png" alt="George" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'joey' && 
                <img src="character-images/joey.png" alt="George" className="h-full w-auto absolute right-2" />
            }
        </button>
    );
}
