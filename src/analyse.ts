import { WordMapping } from "../src/wordmap.js";

export class Analyser {
    #wordMap: WordMapping[];
    #maxTick?: number;
    constructor() {
        this.#wordMap = [];
        this.#maxTick = undefined;
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

    getNextWordFreq(words: Array<string>): WordMapping[] {
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

    #cleanString(input: string) {
        return input.toLowerCase().replace(/[^a-zA-Z\s\n\r\t]/g, '');
    }


    input(text: string) {
        let uniqueWords = this.getWords(this.#cleanString(text));
        this.#wordMap = this.getNextWordFreq(uniqueWords);
    }

    selectFromFreq(map: Map<string, number>) {
        const mapArr = Array.from(map.entries());
        const totalWeight = mapArr.reduce((sum, [_, weight]) => sum + weight, 0);
        
        let rand = Math.random() * totalWeight;

        for (const [key, weight] of mapArr) {
            if (rand < weight) {
                return key;
            }
            rand -= weight;
        }

        return undefined;
    }

    getRandomWord(): string {
        return this.#wordMap[
            Math.floor(Math.random() * this.#wordMap.length)
        ].getWord();
    }

    generateNextWord(word: string): string {
        let wordMap = this.#wordMap.find(mapping => mapping.getWord() === word)?.clone();

        let nextWord;
        if (wordMap === undefined) {
            nextWord = this.getRandomWord();
        } else {
            nextWord = this.selectFromFreq(wordMap.getMap());
            if (nextWord === undefined) nextWord = this.getRandomWord();
        }
        return nextWord;
    }

    generate(word: string, delay: number, tick: number) {
        console.log(word);
        if (this.#maxTick == undefined || tick < this.#maxTick) {
            const nextWord: string = this.generateNextWord(word);
            setTimeout(() => this.generate(nextWord, delay, tick + 1), delay);
        } else {
            return;
        }
    }

    begin(word: string, delay: number, maxWordCount?: number) {
        word = word.toLowerCase();
        this.#maxTick = maxWordCount;
        this.generate(word, delay, 0);
    }
}