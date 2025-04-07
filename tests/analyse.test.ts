import { Analyser } from "../src/analyse";
import { WordMapping } from "../src/wordmap";

describe('Testing Analyser', () => {
    let analyser = new Analyser();

    test('getWords()', () => {
        expect(analyser.getWords("Hello mr fox")).toEqual(["Hello", "mr", "fox"]);
        expect(analyser.getWords("Hello mr fox\nHow are you")).toEqual(["Hello", "mr", "fox", "How", "are", "you"]);
        expect(analyser.getWords("The lazyfox is \nnot dead")).toEqual(["The", "lazyfox", "is", "not", "dead"]);
        expect(analyser.getWords("The lazy brown fox jumps over\nthe \nnext")).toEqual(["The", "lazy", "brown", "fox", "jumps", "over", "the", "next"]);
    });

    test('getNextWordFreq()', () => {
        expect(analyser.getNextWordFreq(["Hello", "mr", "fox", "mr"])).toStrictEqual([
            new WordMapping("Hello"),
            new WordMapping("mr"),
            new WordMapping("fox")
        ]);
    });

    test('getFreq()', () => {
        expect(analyser.getFreq(["Hello", "mr", "fox"])).toEqual(new Map<string, number>([["Hello", 1], ["mr", 1], ["fox", 1]]));
        expect(analyser.getFreq(["Hello", "mr", "fox", "Hello", "are", "fox"])).toEqual(new Map<string, number>([["Hello", 2], ["mr", 1], ["fox", 2], ["are", 1]]));
        expect(analyser.getFreq(["The", "lazy", "fox", "the", "lAzy", "fox", "lazy"])).toEqual(new Map<string, number>([["The", 1], ["lazy", 2], ["fox", 2], ["the", 1], ["lAzy", 1]]));
    });
});