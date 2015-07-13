# readmepad [![Built with Grunt][grunt-img]](http://gruntjs.com/)

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] 

* Project generated with Yeoman generator-gruntproject v0.1.20

## Install

```bash
sudo su
# recuperation du repo
git clone https://github.com/sixertoy/readmepad
cd readmepad
# changer de branche au besoin
# - master (default)
# - develop
# - feature/app
# - feature/docker
#
git checkout <branch_name>
#
# installation des dependences
npm install
bower install --allow-root
#
# build bower components
grunt build_bower
#
# build du serveur
grunt build_server
#
# build du client HTML
grunt build_html
#
# lancement du serveur
npm start
# se connecter sur http://localhost:9080/ 
```

## Angular Components

- [The Top 10 Mistakes AngularJS Developers Make](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make)
- [UI.Bootstrap](https://angular-ui.github.io/bootstrap)
- [Satellizer](https://github.com/sahat/satellizer)
- [Markdown-it](https://github.com/markdown-it/markdown-it)
- [UI.Ace](http://angular-ui.github.io/ui-ace/)
- [Bootstrap](http://getbootstrap.com)

## Issues

## History

[grunt-img]: https://cdn.gruntjs.com/builtwith.png
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/readmepad
[coverall-img]: https://img.shields.io/coveralls/sixertoy/readmepad.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/readmepad
[travis-img]: http://img.shields.io/travis/sixertoy/readmepad.svg?style=flat-square

[npm-url]: https://npmjs.org/package/generator-gruntproject
[npm-version-img]: http://img.shields.io/npm/v/readmepad.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/readmepad.svg?style=flat-square
