import fs from 'fs';
import { JSDOM } from 'jsdom';

var window = new JSDOM('', {
    runScripts: 'dangerously'
}).window;

// Mock things that jsdom doesn't support out-of-the-box
window.URL.createObjectURL = function() {};

export default function plotlyNode(plotlyPath) {
    // Execute source code by inserting a <script> tag containing it
    var scriptEl = window.document.createElement('script');
    scriptEl.textContent = fs.readFileSync(plotlyPath, { encoding: 'utf-8' });
    window.document.body.appendChild(scriptEl);

    return window.Plotly;
};
