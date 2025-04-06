import { WordMapping } from "./analyse.js";

let word1 = new WordMapping("hello");
word1.addFreq('friend');
word1.increaseFreq('friend', 1);

word1.display();