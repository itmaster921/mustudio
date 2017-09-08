/**
 * business App configuration
 */

'use strict';

import config from './config/environment';
import {showByStudioIdPug} from './api/studio/studio.controller';

export default function(businessApp) {

  businessApp.set('views', `${config.businessSitesDir}`);
  businessApp.set('view engine', 'pug');
  businessApp.get('/',
      function(req, res) {
        let businessId = req.hostname.split('.')[0];

        showByStudioIdPug(businessId, (err, studio) => {
            res.render(`${businessId}/index`, {
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

}
