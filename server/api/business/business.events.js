/**
 * Business model events
 */

'use strict';

import {EventEmitter} from 'events';
var BusinessEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BusinessEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Business) {
  for(var e in events) {
    let event = events[e];
    Business.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    BusinessEvents.emit(event + ':' + doc._id, doc);
    BusinessEvents.emit(event, doc);
  };
}

export {registerEvents};
export default BusinessEvents;
