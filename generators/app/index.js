'use strict';
const yeoman = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const needle = require('needle');
const packageJSON = require('../../package.json');
const notifier = require('node-notifier');
const utils = require('./utils/misc');

const TOGGLE = {
    needUpgrade:false
}

const CONFIG = require('./templates/config');
const boilerplatesMap = CONFIG.boilerplatesMap;

module.exports = yeoman.Base.extend({
    /*
    * 初始化时调用
    * */
    initializing: function () {
        this.props = {};

        /*
        * 自更新逻辑
        * */
        if (TOGGLE.needUpgrade) {
            const selfupdate = require('selfupdate');
            selfupdate.isUpdated(packageJSON, function(error, isUpdated) {
                if(error) throw error;
                if (isUpdated) return;

                notifier.notify({
                    title: 'generator-react-scaffold',
                    subtitle:'已有新版本,正在更新...',
                    message: '如果更新失败，请手动更新\n执行 npm i -g generator-react-scaffold',
                    contentImage:path.resolve(__dirname,'blademaster.jpg'),
                    // icon:path.resolve(__dirname,'peon.jpg'),
                    sound: true, // Only Notification Center or Windows Toasters
                    wait: true // Wait with callback, until user action is taken against notification
                }, function (err, response) {
                    // Response is response from notification
                });

                selfupdate.update(packageJSON, function(error, version) {
                    if(error) throw error;
                    notifier.notify({
                        title: 'generator-react-scaffold',
                        subtitle:'更新完毕',
                        message: '请重新运行本应用\n执行 yo react-scaffold',
                        contentImage:path.resolve(__dirname,'blademaster.jpg'),
                        // icon:path.resolve(__dirname,'peon.jpg'),
                        sound: true, // Only Notification Center or Windows Toasters
                        wait: true // Wait with callback, until user action is taken against notification
                    }, function (err, response) {
                        // Response is response from notification
                    });
                });

            });
        }

    },

    /*
    *
    * 配置各种选项
    *
    * */
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the sweet ' + chalk.red('generator-react-scaffold') + ' generator!'
        ));
        let allBoilerplates=_.keys(boilerplatesMap);
        var prompts = [
            {
                name: 'boilerplate',
                type: 'list',
                choices: allBoilerplates,
                default: allBoilerplates[0],
                message: 'boilerplate'
            }, {
                name: 'name',
                message: 'Your project name',
                default: path.basename(process.cwd())// Default to current folder name
            }, {
                name: 'version',
                default: '0.1.0',
                message: 'version'
            },
            {
                name: 'description',
                default: 'react',
                message: 'description'
            },
            {
                name: 'repo',
                default: utils.getGitOrigin(),
                message: 'git repository'
            },
            {
                name: 'keywords',
                default: 'react',
                message: 'keywords',
                filter: function (words) {
                    return words.split(/\s*,\s*/g);
                }
            },
            {
                name: 'author',
                default: this.user.git.name(),
                message: 'author'
            },
            {
                name: 'email',
                default: this.user.git.email(),
                message: 'E-Mail'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someAnswer;

            done();
        }.bind(this));
    },

    /*
     * 生成 LICENSE
     *
     * */
    default: function () {
        this.composeWith('license', {
            options: {
                name: this.props.author,
                email: this.props.email,
                website: ''
            }
        }, {
            local: require.resolve('generator-license/app')
        });

    },
    writing: {
        "init":function () {
            this.currentDir = boilerplatesMap[this.props.boilerplate] || _.keys(boilerplatesMap)[0];
        },

        /*
         * 生成 package.json
         *
         * */
        "package_json": function () {
            var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

            var pkg_json={
                "webpack-react": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-cli": "^6.26.0",
                        "babel-loader": "^6.4.1",
                        "babel-preset-env": "^1.7.0",
                        "babel-preset-react": "^6.24.1",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^1.0.1",
                        "file-loader": "^0.8.5",
                        "json-loader": "^0.5.4",
                        "less": "^2.5.3",
                        "less-loader": "^2.2.2",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.8.0",
                        "style-loader": "^0.13.0",
                        "url-loader": "^0.5.7",
                        "webpack": "^1.12.14",
                        "webpack-dev-server": "^1.14.1"
                    },
                    dependencies:{
                        "classnames": "^2.2.5",
                        "es6-promise": "^4.0.5",
                        "isomorphic-fetch": "^2.2.1",
                        "prop-types": "^15.6.2",
                        "qs": "^6.3.0",
                        "react": "^16.7.0",
                        "react-dom": "^16.7.0"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                },
                "webpack-react-redux": {
                    devDependencies:{
                        "autoprefixer": "^6.3.3",
                        "babel-cli": "^6.26.0",
                        "babel-loader": "^6.4.1",
                        "babel-preset-env": "^1.7.0",
                        "babel-preset-react": "^6.24.1",
                        "clean-webpack-plugin": "^0.1.15",
                        "copy-webpack-plugin": "^4.0.1",
                        "css-loader": "^0.23.1",
                        "extract-text-webpack-plugin": "^1.0.1",
                        "file-loader": "^0.8.5",
                        "json-loader": "^0.5.4",
                        "less": "^2.5.3",
                        "less-loader": "^2.2.2",
                        "open": "0.0.5",
                        "postcss-initial": "^1.5.1",
                        "postcss-loader": "^0.8.0",
                        "style-loader": "^0.13.0",
                        "url-loader": "^0.5.7",
                        "webpack": "^1.12.14",
                        "webpack-dev-server": "^1.14.1"
                    },
                    dependencies:{
                        "classnames": "^2.2.5",
                        "es6-promise": "^4.0.5",
                        "isomorphic-fetch": "^2.2.1",
                        "lodash.assign": "^4.2.0",
                        "prop-types": "^15.6.2",
                        "qs": "^6.3.0",
                        "react": "^16.7.0",
                        "react-dom": "^16.7.0",
                        "react-redux": "^5.1.1",
                        "redux": "^4.0.1"
                    },
                    scripts:{
                        "start": "node devserver.js",
                        "build": "webpack --config ./webpack.config.js"
                    }
                }
            }[this.props.boilerplate]||{};

            this.pkg = extend({
                name: _.kebabCase(this.props.name),
                version: this.props.version,
                description: this.props.description,
                repository: {
                    type: 'git',
                    url: this.props.repo,
                },
                author: {
                    name: this.props.author,
                    email: this.props.email
                },
                keywords: [],
                "dependencies": pkg_json.dependencies||{},
                "devDependencies": pkg_json.devDependencies||{},
                "scripts":pkg_json.scripts||{},
                "bugs": {
                    "url": "http://" + utils.getHomeUrl(this.props.repo) + "/issues"
                },
                "homepage": "http://" + utils.getHomeUrl(this.props.repo)
            }, currentPkg);

            // Combine the keywords
            if (this.props.keywords) {
                this.pkg.keywords = _.uniq(this.props.keywords.concat(this.pkg.keywords));
            }

            // Let's extend package.json so we're not overwriting user previous fields
            this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
        },
        /*
         * 生成 README.md
         *
         * */
        "directories": function () {
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/gitignore", this.destinationPath('./.gitignore'));
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/babelrc", this.destinationPath('./.babelrc'));
            this.fs.copy(this.templatePath('./' + this.currentDir + '/static') + "/**/*.*", this.destinationPath('./'));
            this.fs.copyTpl(this.templatePath('./' + this.currentDir + '/tpl') + "/**/*.*", this.destinationPath('./'), {AppName: this.pkg.name});
        }

    },

    "install": function () {
        let opt = {
            cwd: this.destinationPath('./')
        };
        switch (this.props.boilerplate) {
            case 'webpack-react':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            case 'webpack-react-redux':
                this.spawnCommandSync('npm', ['install'],opt);
                this.spawnCommandSync('webpack',[],opt);
                this.spawnCommandSync('npm',['start'],opt);
                break;
            default:
                break;
        }
    }
});
