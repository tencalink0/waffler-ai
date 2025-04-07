import { WordMapping } from "./wordmap.js";
import { Analyser } from "./analyse.js";
import { promises as fs } from 'fs';

async function loadData(textFileArr: Array<string>) {
    let accumulatedData = '';

    for (const file of textFileArr) {
        try {
            const fileData = await fs.readFile(file, 'utf8');
            accumulatedData += fileData; 
        } catch (err) {
            //TODO: better fallback
            console.log(`Failed to load ${file}, using fallback...`);
            accumulatedData += "A cow likes to eat chicken";
        }
    }

    return accumulatedData;
}

loadData([
    './training_data/test_data2.txt',
    './training_data/test_data.txt'
]).then(testData => {
    let analyser = new Analyser();
    analyser.input(testData);
    
    analyser.begin("The", 100);
});