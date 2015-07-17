module.exports = function(grunt) {
    
    grunt.initConfig({
        exec: {
            handlebars: {
                command: 'handlebars generator/index.handlebars -f generator/index.handlebars.js -c handlebars',
                stdout: true
            },
            generate: {
                command: 'node ./generator/generate.js',
                stdout: true
            },
            spritecp: {
                command: 'cp ./glyph-iconset/sprite/sprite.svg ./',
                stdout: true
            },
            iconwccp: {
                command: 'cp ./node_modules/icon-webcomponent/build/iconwc.js ./js',
                stdout: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', ['exec']);
}
