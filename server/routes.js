/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import config from './config/environment';
import {showByStudioIdPug} from './api/studio/studio.controller';

export default function(app) {
  // Insert routes below
  app.use('/api/sections', require('./api/section'));
  app.use('/api/studios', require('./api/studio'));
  app.use('/api/business', require('./api/business'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);


  app.get('/s3/policy', require('./components/s3-policy/s3-policy').get);

  app.get('/businessId/:username', function (req, res) {
    showByStudioIdPug(req.params.username, (err, studio) => {
      if(err) return res.sendFile(`${config.root}/server/views/404.html`);
      //console.log('section - ', studio.section.jsonPath);
      res.render(`${req.params.username}/index`, {
        title: (studio && studio.metadata && studio.metadata.title) ? studio.metadata.title : '',
        description: (studio && studio.metadata && studio.metadata.description) ? studio.metadata.description : '',
        author: (studio && studio.metadata && studio.metadata.author) ? studio.metadata.author : '',
        keywords: (studio && studio.metadata && studio.metadata.keywords) ? studio.metadata.keywords.map(item => item['text']).join(',') : '',
        section: studio.section
      }, function(err, html) {
        if(err) {
          console.log(err);
          res.sendFile(`${config.root}/server/views/404.html`);
        } else {
          res.send(html);
        }
      });
    });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
