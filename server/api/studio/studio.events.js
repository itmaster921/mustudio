/**
 * Studio model events
 */

'use strict';

import {EventEmitter} from 'events';
var StudioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StudioEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Studio) {
  for(var e in events) {
    let event = events[e];
    Studio.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    StudioEvents.emit(event + ':' + doc._id, doc);
    StudioEvents.emit(event, doc);
  };
}

export {registerEvents};
export default StudioEvents;
