export class WordMapping {
    #word: string;
    #nextWord: Map<string, number>;

    constructor(word: string) {
        this.#word = word;
        this.#nextWord = new Map<string, number>();
    }

    addFreq(word: string, amount: number = 1) {
        this.#nextWord.set(word, amount)
    }

    increaseFreq(word: string, amount: number = 1) {
        const freq = this.#nextWord.get(word) || 0;
        this.#nextWord.set(word, freq + amount);
    }

    getWord(): string {
        return this.#word;
    }

    getMap(): Map<string, number> {
        return this.#nextWord;
    }

    clone(): WordMapping {
        const newMapping = new WordMapping(this.#word);
        newMapping.#nextWord = new Map(this.#nextWord);
        return newMapping;
    }

    display() {
        console.log(`\x1b[32m${this.#word}\x1b[0m:`);
        this.#nextWord.forEach((val, key) => {
            console.log(`\t${key}: \x1b[33m${val}\x1b[0m`);
        });
    }
}