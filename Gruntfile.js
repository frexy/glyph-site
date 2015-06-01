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
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', ['exec']);
}
