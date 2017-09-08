/**
 * Business site generator
 */

'use strict';

const fs = require('fs-extra');
import Config from '../../config/environment';



module.exports.generate = function(busniessId, section, next){

	var businessPath = Config.businessSitesDir + '/' + busniessId;
	// 1st: remove the existing directory
	try {
		fs.remove(businessPath, err => {
			if (err) return console.error(err);

			fs.copy(Config.root + '/server/views/' + section.name, businessPath, err => {
				if (err) return console.error(err);
				next(err);
			})
		})
	} catch (err){
		return console.error('site Generator', err);
	}
};
