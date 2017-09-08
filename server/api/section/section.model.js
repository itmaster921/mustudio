'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './section.events';

var SectionSchema = new mongoose.Schema({
  name: String,
  jsonPath: Object
});

registerEvents(SectionSchema);
export default mongoose.model('Section', SectionSchema);
