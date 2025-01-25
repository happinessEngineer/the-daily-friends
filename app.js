function App() {
    const version = 'v1.3';
    const [hasLoadedGame, setHasLoadedGame] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [gameNumber, setGameNumber] = React.useState(null);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [showResult, setShowResult] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const [gameComplete, setGameComplete] = React.useState(false);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [product, setProduct] = React.useState(null);
    const [shouldFixAnswers, setShouldFixAnswers] = React.useState(true);
    const [isPreviouslyCompleted, setIsPreviouslyCompleted] = React.useState(false);
    const questionRef = React.useRef(null);
    const answersRef = React.useRef(null);

    React.useEffect(() => {
        const loadGame = async () => {
            const [number, questionData] = await fetchTriviaQuestions();
            const product = await fetchProduct();
            setProduct(product);

            if (questionData && questionData.length > 0) {
                setGameNumber(number);
                setQuestions(questionData);
                
                // Load saved progress from localStorage
                const savedProgress = localStorage.getItem(`dailyFriends_${number}`);
                if (savedProgress) {
                    const progress = JSON.parse(savedProgress);
                    setCurrentQuestion(progress.currentQuestion);
                    setResults(progress.results);
                    setGameComplete(progress.gameComplete);
                    setIsPreviouslyCompleted(true);
                } else {
                    // Initialize empty results array for new game
                    setResults(new Array(questionData.length).fill(null));
                }
            }
            setHasLoadedGame(true);
        };
        loadGame();
    }, []);

    React.useEffect(() => {
        const checkOverlap = () => {
            if (questionRef.current && answersRef.current) {
                const questionRect = questionRef.current.getBoundingClientRect();
                const answersRect = answersRef.current.getBoundingClientRect();
                const questionBottom = questionRect.top + questionRect.height;
                const answersHeight = answersRect.height;
                const viewportHeight = window.innerHeight;
                setShouldFixAnswers(questionBottom + 40 + answersHeight < viewportHeight);
            }
        };

        checkOverlap();
        window.addEventListener('resize', checkOverlap);
        return () => window.removeEventListener('resize', checkOverlap);
    }, [questions, currentQuestion]);

    const handleAnswer = async (answer) => {
        if (showResult) return;
        
        setSelectedAnswer(answer);
        setShowResult(true);
        
        const isCorrect = answer === questions[currentQuestion].correctAnswer;
        const newResults = [...results];
        newResults[currentQuestion] = isCorrect;
        setResults(newResults);
        
        // Save progress to localStorage
        const progress = {
            currentQuestion: currentQuestion,
            results: newResults,
            gameComplete: currentQuestion === questions.length - 1
        };
        localStorage.setItem(`dailyFriends_${gameNumber}`, JSON.stringify(progress));
        
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setShowResult(false);
                setSelectedAnswer(null);
                setTimeout(() => {
                    setCurrentQuestion(currentQuestion + 1);
                    // Update saved progress with new question
                    progress.currentQuestion = currentQuestion + 1;
                    localStorage.setItem(`dailyFriends_${gameNumber}`, JSON.stringify(progress));
                }, 50);
            } else {
                setGameComplete(true);
            }        
        }, 2000);
    };

    if (questions.length === 0) {
        return (
            <div data-name="upload-container" className="container mx-auto max-w-2xl p-4 text-center">
                <h1 data-name="game-title" className="logo text-xl font-bold mb-8">
                    
                </h1>
            </div>
        );
    }

    if (gameComplete) {
        const today = new Date();
        const dateKey = today.toISOString().split('T')[0]; // Format: yyyy-mm-dd
        const gameResults = {
            score: results.filter(Boolean).length,
            totalQuestions: questions.length,
            results: results
        };
        localStorage.setItem(dateKey, JSON.stringify(gameResults));

        return hasLoadedGame ? (
            <>
                <div data-name="game-complete" className="container mx-auto max-w-2xl p-4">
                    <ResultDisplay 
                        score={results.filter(Boolean).length}
                        totalQuestions={questions.length}
                        results={results}
                        gameNumber={gameNumber}
                        product={product}
                        isPreviouslyCompleted={isPreviouslyCompleted}
                    />
                </div>
                <div className="fixed bottom-2 left-2 text-gray-300 text-xs">{version}</div>
            </>
        ) : null;
    }

    const currentQuestionData = questions[currentQuestion];

    return (
        <div data-name="game-container" className="container mx-auto max-w-2xl p-4">
            <h1 data-name="game-title" className="logo text-xl font-bold text-center mb-8">
                {gameNumber ? `#${gameNumber}` : ''}
            </h1>
            
            <div ref={questionRef}>
                <QuestionDisplay 
                    question={currentQuestionData}
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                />
            </div>

            <div 
                ref={answersRef}
                data-name="answers-container" 
                className={`answers-container grid gap-3 ${shouldFixAnswers ? 'answers-container-fixed' : ''}`}
            >
                {currentQuestionData.characters.map((character, index) => (
                    <AnswerButton
                        key={`${currentQuestion}-${character}`}
                        character={character}
                        isCorrect={character === currentQuestionData.correctAnswer}
                        isSelected={character === selectedAnswer}
                        onClick={() => handleAnswer(character)}
                        showResult={showResult}
                    />
                ))}
            </div>
            <div className="fixed bottom-1 left-1 text-gray-300 text-xs">{version}</div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
