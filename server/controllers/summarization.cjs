const stopwords = require('stopword');


// Function to preprocess text
const preprocessText = async (text) => {
    try {
        console.log(text);

        // Convert text to lowercase
        let processedText = text.toLowerCase();

        // Remove URLs
        processedText = processedText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

        // Remove email addresses
        processedText = processedText.replace(/\S+@\S+\.\S+/g, '');

        // Remove special characters and symbols
        processedText = processedText.replace(/[^\w\s]/g, '');

        // Tokenize the text into words
        const words = processedText.split(/\s+/);

        // Remove stopwords
        const filteredWords = words.filter(word => !stopwords.eng.includes(word));

        // Remove duplicate words
        const uniqueWords = [...new Set(filteredWords)];

        // Join the unique words back into text
        processedText = uniqueWords.join(' ');

        return processedText;
    } catch (error) {
        console.error("Error preprocessing text:", error);
        throw error;
    }
};

// Function to summarize text
const summarizeText = async (text) => {
    try {
        console.log(text);
        const { pipeline } = await import("@xenova/transformers");
        const preprocessedText = await preprocessText(text);
        const pipe = await pipeline("summarization", 'Xenova/distilbart-cnn-6-6');
        const result = await pipe(preprocessedText, { max_length: 100, min_length: 10 });
        const summary = result[0].summary_text;
        
         // Remove duplicate words from summary
         const summaryWords = summary.split(/\s+/);
         const uniqueSummaryWords = [...new Set(summaryWords)];
         const uniqueSummary = uniqueSummaryWords.join(' ');
 
         return uniqueSummary;
    } catch (error) {
        console.error("Error summarizing text:", error);
        throw error;
    }
};

// Function to calculate sentiment score
const sentimentScore = async (text) => {
    try {
        const { pipeline } = await import("@xenova/transformers");
        const preprocessedText = await preprocessText(text);
        const pipe = await pipeline("sentiment-analysis");
        const result = await pipe(preprocessedText);
        return result;
    } catch (error) {
        console.error("Error calculating sentiment score:", error);
        throw error;
    }
};

module.exports = { preprocessText, summarizeText, sentimentScore };
