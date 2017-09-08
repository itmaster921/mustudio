'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './business.events';

var BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  address: String,
  status: {
    type: String,
    default: 'active'
  }
});

/**
 * Validations
 */

// Validate empty name
BusinessSchema
    .path('name')
    .validate(function(name) {
      return name.length;
    }, 'Business name cannot be blank');

// Validate name is not taken
BusinessSchema
    .path('name')
    .validate(function(value) {
      return this.constructor.findOne({ name: value }).exec()
          .then(business => {
            if(business) {
              if(this.id === business.id) {
                return true;
              }
              return false;
            }
            return true;
          })
          .catch(function(err) {
            throw err;
          });
    }, 'The specified business name is already in use.');


registerEvents(BusinessSchema);
export default mongoose.model('Business', BusinessSchema);
