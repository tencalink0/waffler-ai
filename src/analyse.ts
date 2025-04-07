import { WordMapping } from "../src/wordmap.js";

export class Analyser {
    #wordMap: WordMapping[];
    constructor() {
        this.#wordMap = [];
    }

    getWords(text: string): Array<string> {
        let wordArr = text.replace(/\n/g, " ").split(' ');
        let uniqueWords: Array<string> = [];
        
        for (let word of wordArr) {
            if (word === '' || uniqueWords.includes(word)) continue;
            uniqueWords.push(word);
        }
        return uniqueWords;
    }

    getFreq(words: Array<string>): Map<string, number> {
        let wordFreqMap: Map<string, number> = new Map();

        for (let word of words) {
            let wordFound = wordFreqMap.get(word);

            if (wordFound) { wordFreqMap.set(word, wordFound += 1) }
            else wordFreqMap.set(word, 1);
        }
        return wordFreqMap;
    }

    #nextWord(words: Array<string>, index: number) {
        let newIndex = index + 1;
        if (words.length - 1 < newIndex || newIndex < 0) return null;
        return words[newIndex];
    }

    getNextWordFreq(words: Array<string>) {
        let wordMappingArr: WordMapping[] = [];

        for (let i = 0; i < words.length; i++) {
            let wordMap = wordMappingArr.find(mapping => mapping.getWord() === words[i]);
            if (wordMap) {
                let nextWord = this.#nextWord(words, i);
                if (nextWord !== null) wordMap.increaseFreq(nextWord);
            } else {
                let newMapping = new WordMapping(words[i]);
                let nextWord = this.#nextWord(words, i);
                if (nextWord !== null) newMapping.addFreq(nextWord);

                wordMappingArr.push(newMapping);
            }
        }
        return wordMappingArr;
    }

    input(text: string) {
        let uniqueWords = this.getWords(text.toLowerCase());
        this.getNextWordFreq(uniqueWords);
    }
}