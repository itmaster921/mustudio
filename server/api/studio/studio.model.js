'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './studio.events';

var StudioSchema = new mongoose.Schema({
  templateName: String,
  category: String,
  type: String,
  logo: String,
  studioId: {
    type: String,
    lowercase: true,
    required: true
  },
  metadata: {
    title: String,
    description: String,
    keywords: [
      {text: String}
    ],
    author: String
  },
  colors: [],
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  UpdatedDate: {
    type: Date,
    default: Date.now()
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  }
});


StudioSchema.pre('save', function preSave(next){
  var studio = this;
  studio.UpdatedDate = Date.now();
  next();
});

// Validate studioId is not taken
StudioSchema
    .path('studioId')
    .validate(function(value) {
      return this.constructor.findOne({ studioId: value }).exec()
          .then(studio => {
            if(studio) {
              if(this.id === studio.id) {
                return true;
              }
              return false;
            }
            return true;
          })
          .catch(function(err) {
            throw err;
          });
    }, 'The specified studio ID is already in use.');

registerEvents(StudioSchema);
export default mongoose.model('Studio', StudioSchema);
