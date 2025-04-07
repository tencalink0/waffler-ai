import { WordMapping } from "./wordmap.js";
import { Analyser } from "./analyse.js";
import { promises as fs } from 'fs';

async function loadData() {
    try {
        const testData = await fs.readFile('./training_data/test_data.txt', 'utf8');
        return testData;
    } catch (err) {
        // TODO: better fallback
        console.log("Failed to load, using fallback...");
        return "A cow likes to eat chicken";
    }
}

loadData().then(testData => {
    let analyser = new Analyser();
    analyser.input(testData);
    
    analyser.begin("The", 100);
});