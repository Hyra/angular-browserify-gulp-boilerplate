## What is it

This is a boilerplate for Angular Apps using Browserify for modularity and Gulp as build tool.

## Why

It's meant to serve as a foundation for new web apps so you can quickly create something new, rather than having to configure and setting up the base.

## Contents

It includes some sample controllers, a service and a directive.

Gulp tasks include watching js/sass and building, as well as a simple (live reloading) webserver with html5 url support

Besides this, it includes sensible settings for:

- .editorconfig
- .jshintrc

## How to install

Make sure you have NodeJS installed and have installed both `gulp` and `browserify` globally. After that it's easy:

- Clone the app
- run npm install
- run gulp
- Build something awesome

When gulp is active, your app will be available at http://localhost:5000 and will be live reloaded when you change any SASS or JS files

## Extending

I tried to keep the boilerplate as bare bones as possible. This means things like Bootstrap or Foundation are not included. More often than not I find myself not using it, so the preferred way is to add it when needed, not to remove it when not.

Installing it is trivial though:

    npm install bootstrap-sass jquery

Add the dependencies to main.js

    var $ = jQuery = require('jquery');
    require('bootstrap-sass/vendor/assets/javascripts/bootstrap/dropdown'); // Or another plugin you want

Add the stylesheet to app.scss

    @import "./node_modules/bootstrap-sass/vendor/assets/stylesheets/bootstrap.scss";
