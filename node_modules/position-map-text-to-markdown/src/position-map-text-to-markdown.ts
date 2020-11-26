// MIT © 2017 azu
"use strict";
const StringSource = require("textlint-util-to-string");
const { parse } = require("@textlint/markdown-to-ast");
import TextSource = require("structured-source");

function getAllIndexes(matchText: string, allText: string[]) {
    const indexes: number[] = [];
    let i = -1;
    while ((i = allText.indexOf(matchText, i + 1)) !== -1) {
        indexes.push(i);
    }
    return indexes;
}

/**
 * get markdown location info that match `text`
 * @param {string} text
 * @param {string} markdown
 * @returns {{
 *  markdown:string,
 *  range: [number, number],
 *  loc: {
 *    start: {
 *       line:number,
 *       column:number
 *    },
 *    end: {
 *       line:number,
 *       column:number
 *    }
 * }
 * }[]}
 */
export function findAllPositions({ text, markdown }: { text: string, markdown: string }) {

    const markdownAST = parse(markdown);
    const markdownRawSource = new TextSource(markdown);
    const markdownSource = new StringSource(markdownAST);
    const markdownText = markdownSource.toString();
    const matchIndexes = getAllIndexes(text, markdownText);
    // const parentMatchIndex = markdownText.indexOf(parentText);
    if (matchIndexes.length === 0) {
        return []; // no match
    }
    // get original info
    const getOriginalInfo = (index: number, length: number) => {
        const startIndex = markdownSource.originalIndexFromIndex(index);
        const endIndex = markdownSource.originalIndexFromIndex(index + length, true);
        const startPosition = markdownRawSource.indexToPosition(startIndex);
        const endPosition = markdownRawSource.indexToPosition(endIndex);
        return {
            markdown: markdown.slice(startIndex, endIndex),
            range: [startIndex, endIndex],
            loc: {
                start: startPosition,
                end: endPosition
            }
        };
    };
    return matchIndexes.map((matchIndex) => {
        return getOriginalInfo(matchIndex, text.length);
    });
}
