# mustudio

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.2.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Url Masking

For each studio in production put this code in your .htaccess under DOCUMENT_ROOT directory:

Options +FollowSymLinks -MultiViews
RewriteEngine On
RewriteBase /

RewriteCond %{HTTP_HOST} ^(www\.)?sub\.domain\.com$ [NC]
RewriteRule ^ http://sub.domain.com/businessId/sub%{REQUEST_URI} [L,NE,P]

Other way: on production past this code into server/views/creative/layout.pug to the bottom of the file:

html
  iframe#my-iframe-tag(src='/', frameborder='0', width='800', height='2500', scrolling='no')
  script(type='text/javascript').
    function AdjustIframeSize(dimension)
    {
    document.getElementById("my-iframe-tag").style.width = parseInt(dimension[0]) + "px";
    document.getElementById("my-iframe-tag").style.height = parseInt(dimension[1]) + "px";
    }
  body
  script(type='text/javascript').
    var size = new Array();
    size[0] = Math.max( (document.width?document.width:0), (document.body.scrollWidth?document.body.scrollWidth:0), (document.documentElement.scrollWidth?document.documentElement.scrollWidth:0), (document.body.offsetWidth?document.body.offsetWidth:0), (document.documentElement.offsetWidth?document.documentElement.offsetWidth:0), (document.body.clientWidth?document.body.clientWidth:0), (document.documentElement.clientWidth?document.documentElement.clientWidth:0) );
    size[1] = Math.max( (document.height?document.height:0), (document.body.scrollHeight?document.body.scrollHeight:0), (document.documentElement.scrollHeight?document.documentElement.scrollHeight:0), (document.body.offsetHeight?document.body.offsetHeight:0), (document.documentElement.offsetHeight?document.documentElement.offsetHeight:0), (document.body.clientHeight?document.body.clientHeight:0), (document.documentElement.clientHeight?document.documentElement.clientHeight:0) );
    parent.AdjustIframeSize(size);
