import { WordMapping } from "./wordmap.js";
import { Analyser } from "./analyse.js";
import * as fs from 'fs';

let word1 = new WordMapping("hello");
word1.addFreq('friend');
word1.increaseFreq('friend', 1);

let analyser = new Analyser();
analyser.input("The crazy dog");