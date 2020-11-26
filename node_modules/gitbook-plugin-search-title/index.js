var Entities = require('html-entities').AllHtmlEntities;

var Html = new Entities();

// Map of Lunr ref to document
var documentsStore = {};

module.exports = {
    book: {
        assets: './assets',
        js: [
            'jquery.mark.min.js',
            'search.js'
        ],
        css: [
            'search.css'
        ]
    },

    hooks: {
        // Index each page
        'page': function(page) {
            if (this.output.name != 'website' || page.search === false) {
                return page;
            }

            var text;
           
            this.log.debug.ln('index page', page.path);

            text = page.content;

            // Add properties and methods to search results
            var matches = text.match(/<li><a\shref="#.+"><code>(.*)<\/code><\/a>((?:.|\n)*?)<\/li>/igm);

            if (matches) {
                matches.forEach((item) => {
                    var name, desc, entry;
                    var match = /<li><a\shref="#.+"><code>(.*)<\/code><\/a>((?:.|\n)*?)<\/li>/igm.exec(item);
                    if (match) {
                        name = page.title + '.' + match[1];
                        desc = match[2].replace(/(<([^>]+)>)/ig, '').replace(/[\n ]+/g, ' ');
                        entry = {
                            url: this.output.toURL(page.path) + '#' + match[1].toLowerCase().replace('_', ''),
                            title: name,
                            summary: desc,
                            keywords: match[1],
                            body: desc
                        };
                        documentsStore[entry.url] = entry;
                        // this.log.debug.ln('add member entry:', entry.title); 
                    }
                });
            }
            // Decode HTML
            text = Html.decode(text);

            // Strip HTML tags
            text = text.replace(/(<([^>]+)>)/ig, '');
            text = text.replace(/[\n ]+/g, ' ');
            var keywords = [];
            if (page.search) {
                keywords = page.search.keywords || [];
            }

            // Add to index
            var doc = {
                url: this.output.toURL(page.path),
                title: page.title,
                summary: page.description,
                keywords: keywords.join(' '),
                body: text
            };

            documentsStore[doc.url] = doc;


            return page;
        },

        // Write index to disk
        'finish': function() {
            if (this.output.name != 'website') return;

            this.log.debug.ln('write search index');
            return this.output.writeFile('search_plus_index.json', JSON.stringify(documentsStore));
        }
    }
};