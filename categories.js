// This script prints each article's category name

import fs from 'fs';

let rawdata = fs.readFileSync('zendesk.json');
let data = JSON.parse(rawdata);

let languageCode = process.argv[process.argv.length - 1];

let catCon = ""

data.forEach(locale => {
    if (locale.locale == languageCode) {
        locale.categories.forEach(category => {
            category.sections.forEach(section => {
                section.articles.forEach(article => {
                    catCon += section.name + ", " + article.name + "\n"
                });
            });
        });
    }
});


console.log(catCon)