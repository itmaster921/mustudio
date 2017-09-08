'use strict';

import {Router} from 'express';

import * as controller from './studio.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.post('/isUnique', controller.verifyUnicity);
router.post('/', controller.create);

router.get('/:studioId', auth.isAuthenticated(), controller.showByStudioId);
router.put('/:studioId/meta', auth.isAuthenticated(), controller.updateMeta);
router.post('/:studioId/meta', auth.isAuthenticated(), controller.addMeta);
router.put('/:studioId/publish', auth.isAuthenticated(), controller.publishStudio);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
