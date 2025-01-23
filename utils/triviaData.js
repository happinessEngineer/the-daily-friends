function getFormattedDate(dateParam = null) {
    if (dateParam) {
        return dateParam;
    }
    const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

async function fetchTriviaQuestions() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        const formattedDate = getFormattedDate(dateParam);

        const response = await fetch(`./questions/${formattedDate}-questions-and-answers.json`);
        const data = await response.json();
        return [data.gameNumber, data.questions];
    } catch (error) {
        reportError(error);
        return [];
    }
}

async function fetchProduct() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        const formattedDate = getFormattedDate(dateParam);

        const response = await fetch(`./products-of-the-day.json`);
        const data = await response.json();
        return data[formattedDate];
    } catch (error) {
        return [];
    }
}
