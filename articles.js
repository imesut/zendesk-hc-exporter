// This script prepares a csv file to import articles to CMS platform

import fs from 'fs';
import fastcsv from 'fast-csv'

const ws = fs.createWriteStream("data.csv");

let rawdata = fs.readFileSync('zendesk.json');
let data = JSON.parse(rawdata);

let languageCode = process.argv[process.argv.length - 1];

let content = "";
let jsonData = []

data.forEach(locale => {
    if (locale.locale == languageCode) {
        locale.categories.forEach(category => {
            content += category.name + "\n";
            category.sections.forEach(section => {
                content += "    " + section.name + "\n";
                section.articles.forEach(article => {
                    jsonData.push({
                        post_title: article.name,
                        post_type: "docs",
                        language_code: languageCode.substring(0,2), // Our wordpress config accepts two letter configs
                        post_content: article.body
                    })
                });
            });
        });
    }
});

fastcsv
    .write(jsonData, {
        headers: true
    })
    .on("finish", function () {
        console.log("Write to CSV successfully!");
    })
    .pipe(ws);