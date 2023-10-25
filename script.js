function normalizeText(text) {
    // Remove new lines and extra spaces
    return text.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeRegExp(text) {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function insertLineBreaks(original, translation) {
    const wordsOriginal = original.split(' ');
    const wordsTranslation = translation.split(' ');
    let currentPosition = 0;

    for (let i = 0; i < wordsOriginal.length; i++) {
        // Find the position of the next space or end of line in the original text
        currentPosition += wordsOriginal[i].length + 1; // +1 for the space

        // If the original text has a line break, insert a line break into the translated text at the nearest space
        if (original[currentPosition] === '\n') {
            if (i < wordsTranslation.length - 1) {
                wordsTranslation[i] += '\n';
            }
        }
    }
    
    return wordsTranslation.join(' ');
}

function replaceSubtitles() {
    const srtContent = document.getElementById('srt-content').value.split('\n');
    const englishSentences = document.getElementById('english-sentences').value.split('\n').filter(sentence => sentence.trim());
    const translatedSentences = document.getElementById('translated-sentences').value.split('\n').filter(sentence => sentence.trim());
    const output = document.getElementById('output');

    if (englishSentences.length !== translatedSentences.length) {
        alert('Error: The number of English sentences does not match the number of translated sentences.');
        return;
    }

    let newSRTContent = '';
    let currentBlock = '';
    let accumulatedText = '';
    let isTextLine = false;
    let foundMatch = false;

    for (const line of srtContent) {
        if (line.trim() === '') {
            if (!foundMatch && accumulatedText) {
                newSRTContent += accumulatedText + '\n';
            }
            currentBlock = '';
            accumulatedText = '';
            foundMatch = false;
            isTextLine = false;
            newSRTContent += '\n';
        } else if (isTextLine) {
            currentBlock += line + '\n';
            accumulatedText += ' ' + line.trim();
            const normalizedAccumulatedText = normalizeText(accumulatedText);

            for (let i = 0; i < englishSentences.length; i++) {
                const normalizedEnglish = normalizeText(englishSentences[i]);

                if (normalizedAccumulatedText.includes(normalizedEnglish)) {
                    const translation = insertLineBreaks(currentBlock, translatedSentences[i]);
                    newSRTContent += translation + '\n';
                    foundMatch = true;
                    // Clear currentBlock and accumulatedText after a successful match
                    currentBlock = '';
                    accumulatedText = '';
                    break;
                }
            }
        } else {
            newSRTContent += line + '\n';
            if (line.includes('-->')) {
                isTextLine = true;
            }
        }
    }

    // Handle the last subtitle block if needed
    if (!foundMatch && accumulatedText.trim()) {
        newSRTContent += accumulatedText + '\n';
    }

    output.textContent = newSRTContent;
}
