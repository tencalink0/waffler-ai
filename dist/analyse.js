var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WordMapping_word, _WordMapping_nextWord;
export class WordMapping {
    constructor(word) {
        _WordMapping_word.set(this, void 0);
        _WordMapping_nextWord.set(this, void 0);
        __classPrivateFieldSet(this, _WordMapping_word, word, "f");
        __classPrivateFieldSet(this, _WordMapping_nextWord, new Map(), "f");
    }
    addFreq(word, amount = 0) {
        __classPrivateFieldGet(this, _WordMapping_nextWord, "f").set(word, amount);
    }
    increaseFreq(word, amount = 1) {
        const freq = __classPrivateFieldGet(this, _WordMapping_nextWord, "f").get(word) || 0;
        __classPrivateFieldGet(this, _WordMapping_nextWord, "f").set(word, freq + amount);
    }
    display() {
        console.log(`\x1b[32m${__classPrivateFieldGet(this, _WordMapping_word, "f")}\x1b[0m:`);
        __classPrivateFieldGet(this, _WordMapping_nextWord, "f").forEach((val, key) => {
            console.log(`\t${key}: \x1b[33m${val}\x1b[0m`);
        });
    }
}
_WordMapping_word = new WeakMap(), _WordMapping_nextWord = new WeakMap();
