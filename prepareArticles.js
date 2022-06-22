import fs from 'fs';

let rawdata = fs.readFileSync('zendesk.json');
let data = JSON.parse(rawdata);

let languageCode = process.argv[process.argv.length-1];

// let content = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <style>body{font-family: sans-serif}</style>
// </head>
// <body>
// `;

let content = "";

data.forEach(locale => {
    if(locale.locale==languageCode){
        locale.categories.forEach(category => {
            content += "<h1>"+category.name+"</h1><br>";
            category.sections.forEach(section => {
                content += "<h2>"+section.name+"</h2><br>";
                section.articles.forEach(article => {
                    content += "<h3>"+article.name+"</h3><br>";
                    content += article.body + "<br><br>";
                });
            });
        });
    } 
});

// content += `
// </body>
// </html>
// `

fs.writeFileSync(languageCode + ".html", content);