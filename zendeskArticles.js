'use strict';

import fetch from 'node-fetch';
import fs from 'fs';
import util from 'util';
import {
    resolve
} from 'path';



const locales = ["en-us", "tr", "ar", "de", "es", "it-it", "pt-pt"];

const base_uri = "https://wewalksupport.zendesk.com/api/v2/help_center/";

let obj = []


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
    }
}

async function get() {

    asyncForEach(locales, async (locale) => {
        let categories_uri = base_uri + locale + "/categories/";

        let n_of_locale = obj.push({
            "locale": locale,
            "categories": []
        }) - 1;

        console.log(locale);


        await fetch(categories_uri)
            .then(response => response.json())
            .then(json => {
                asyncForEach(json.categories, async (category) => {

                    console.log("here", json);

                    let n_of_category = obj[n_of_locale].categories.push({
                        "id": category.id,
                        "name": category.name,
                        "sections": []
                    }) - 1;



                    console.log("obj", obj);

                    console.log(category.id, category.name);

                    let sections_uri = categories_uri + category.id + "/sections/";

                    await fetch(sections_uri)
                        .then(response => response.json())
                        .then(json => {
                            asyncForEach(json.sections, async (section) => {

                                let n_of_section = obj[n_of_locale].categories[n_of_category].sections.push({
                                    "id": section.id,
                                    "name": section.name,
                                    "articles": []
                                }) - 1;

                                console.log(section.id, section.name);
                                console.log(obj);

                                let articles_uri = base_uri + locale + "/sections/" + section.id + "/articles/";

                                await fetch(articles_uri)
                                    .then(response => response.json())
                                    .then(json => {
                                        asyncForEach(json.articles, async (article) => {

                                            console.log(article.id, article.name);
                                            let n_of_article = obj[n_of_locale].categories[n_of_category].sections[n_of_section].articles.push({
                                                "id": article.id,
                                                "name": article.name,
                                                "body": article.body
                                            }) - 1;

                                            console.log("\n\n\n HERE IS OBJ:")
                                            console.log(n_of_locale, n_of_category, n_of_section, n_of_article);

                                            // I'm sorry to apply this hack :(

                                            let data = JSON.stringify(obj);
                                            fs.writeFileSync('zendesk.json', data);

                                            // console.log(util.inspect(obj, false, null, true /* enable colors */));
                                            // if(n_of_section>0){
                                            //     throw ("end");
                                            // }

                                        });
                                    })
                            });
                        })
                });
            })
    });
}


await get();