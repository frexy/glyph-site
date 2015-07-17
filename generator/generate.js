
var fs = require('fs');

//
var indexTemplate = require('./index.handlebars.js');
var Handlebars    = require('handlebars'); 
var svgBase       = __dirname + '/../glyph-iconset/svg';

fs.readdir(svgBase, function (err, files) {
    
    if (err) {
        console.log('err', err);
        return;
    }
    
    (function (svgs) {
        // write the list.txt
        fs.writeFileSync(
            __dirname + '/../list.txt',
            
            // all file name into a string
            svgs.map(function (f) {
                return f.substring(0, (f.length - 4));
            }).join("\n")
        );
        
        fs.writeFileSync(
            __dirname + '/../sprite.svg',
            fs.readFileSync(__dirname + '/../glyph-iconset/sprite/sprite.svg')
                .toString('utf8')
        );

        // write the index/index.html file
        fs.writeFileSync(
            __dirname + '/../index.html',
            Handlebars.templates.index({icons: svgs.map(function (f) {
                return {
                    name    : f.substring(0, (f.length - 4)),
                    keyword : f.substring(9, (f.length - 4)).replace(/\-/g, ' '),
                    content : fs.readFileSync((svgBase + '/' + f))
                };
            })})
        );
    })(files.filter(function (f) {return /svg/.test(f);}));
});
