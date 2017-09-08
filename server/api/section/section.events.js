/**
 * Section model events
 */

'use strict';

import {EventEmitter} from 'events';
var SectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SectionEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Section) {
  for(var e in events) {
    let event = events[e];
    Section.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SectionEvents.emit(event + ':' + doc._id, doc);
    SectionEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SectionEvents;
