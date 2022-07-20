# Zendesk Help Center Exporter

This script set will allow you to export your Zendesk helpcenter articles in json format and process it for importing to other tools.

## Usage

First, run `npm install`

Then;

1. Use `zendeskArticles.js` file to fetch your Zendesk help center articles: `node zendeskArticles.js` But before you should update `base_uri` parameter to reflect your help center url.
2. Use `prepareArticles.js` file if you want an html output of your articles: `node prepareArticles.js en-us` or `node prepareArticles.js de`
3. Use `categories.js` file to print article names with their categories hierarchically : `node categories.js en-us`
4. Use `articles.js` file to prepare a CSV output, for wordpress import for example. by: `node articles.js en-us`