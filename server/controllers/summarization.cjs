const stopwords = require('stopword');  // Import stopwords library to filter common words

// Function to preprocess text
const preprocessText = async (text) => {
    try {
        console.log(text);  // Log the input text

        // Step 1: Convert text to lowercase
        let processedText = text.toLowerCase();

        // Step 2: Remove URLs (e.g., http://example.com)
        processedText = processedText.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

        // Step 3: Remove email addresses (e.g., name@example.com)
        processedText = processedText.replace(/\S+@\S+\.\S+/g, '');

        // Step 4: Remove special characters and symbols, keeping only alphanumeric characters and spaces
        processedText = processedText.replace(/[^\w\s]/g, '');

        // Step 5: Tokenize the text into individual words by splitting on spaces
        const words = processedText.split(/\s+/);

        // Step 6: Remove stopwords (common words like "the", "and", "in", etc.)
        const filteredWords = words.filter(word => !stopwords.eng.includes(word));

        // Step 7: Remove duplicate words to avoid repetition
        const uniqueWords = [...new Set(filteredWords)];

        // Step 8: Join the unique words back into a single string
        processedText = uniqueWords.join(' ');

        return processedText;  // Return the cleaned and processed text
    } catch (error) {
        console.error("Error preprocessing text:", error);  // Catch and log any errors during text preprocessing
        throw error;
    }
};

// Function to summarize text
const summarizeText = async (text) => {
    try {
        console.log(text);  // Log the input text

        // Preprocess the input text before summarization
        const preprocessedText = await preprocessText(text);

        // Load the pre-trained summarization model from Xenova Transformers
        const { pipeline } = await import("@xenova/transformers");
        const pipe = await pipeline("summarization", 'Xenova/distilbart-cnn-6-6');

        // Generate a summary with length constraints (max 100 words, min 10 words)
        const result = await pipe(preprocessedText, { max_length: 100, min_length: 10 });
        const summary = result[0].summary_text;  // Extract the summary text from the model output
        
         // Step 1: Split the summary into individual words
         const summaryWords = summary.split(/\s+/);

         // Step 2: Remove duplicate words in the summary
         const uniqueSummaryWords = [...new Set(summaryWords)];

         // Step 3: Join the unique words back into a single string
         const uniqueSummary = uniqueSummaryWords.join(' ');

         return uniqueSummary;  // Return the cleaned and summarized text
    } catch (error) {
        console.error("Error summarizing text:", error);  // Catch and log any errors during summarization
        throw error;
    }
};

// Function to calculate sentiment score
const sentimentScore = async (text) => {
    try {
        // Preprocess the input text before performing sentiment analysis
        const preprocessedText = await preprocessText(text);

        // Load the sentiment analysis pipeline from Xenova Transformers
        const { pipeline } = await import("@xenova/transformers");
        const pipe = await pipeline("sentiment-analysis");

        // Perform sentiment analysis on the preprocessed text
        const result = await pipe(preprocessedText);

        return result;  // Return the sentiment analysis result (e.g., positive, negative, neutral)
    } catch (error) {
        console.error("Error calculating sentiment score:", error);  // Catch and log any errors during sentiment analysis
        throw error;
    }
};

module.exports = { preprocessText, summarizeText, sentimentScore };  // Export the functions for external use
