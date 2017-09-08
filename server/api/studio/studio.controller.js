/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/studios              ->  index
 * POST    /api/studios              ->  create
 * GET     /api/studios/:id          ->  show
 * PUT     /api/studios/:id          ->  upsert
 * PATCH   /api/studios/:id          ->  patch
 * DELETE  /api/studios/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Studio from './studio.model';
import Section from './../section/section.model';
import siteGenerator from './../../components/siteGenerator';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Studios
export function index(req, res) {
  return Studio.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Studio from the DB
export function show(req, res) {
  return Studio.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Studio from the DB
export function showByStudioId(req, res) {
    return Studio.findById(req.params.studioId).populate('business section').exec()
        .then(studio => {
          if(studio && (studio.CreatedBy + '' == req.user._id + '')) return res.status(200).json({studio: studio});
          else return res.status(200).json({studio: {}});
        },
            err => res.status(500).json(handleError(res)(err))
        )
        .catch(handleError(res));
}

// Publish the Studio
export function publishStudio(req, res) {
  Studio.findById(req.params.studioId).exec()
    .then(studio =>  {
        Section.findOneAndUpdate({_id: studio.section},
          req.body,
          {new: true},
          (err, newSection) => {
            if(!studio.section && newSection) studio.section = newSection._id;
            studio.save((err, updatedStudio) => {
              if(err) return handleError(res)(err);
              else {
                siteGenerator.generate(studio.studioId, newSection, err => {
                  return res.status(201).json(updatedStudio);
                });
              }
            });
          });
      },
      err => res.status(500).json(handleError(res)(err))
    )
    .catch(handleError(res));
}

// Gets a single Studio By studio ID from Pug
export function showByStudioIdPug(studioId, next) {
  if(studioId) {
    return Studio.findOne({studioId: studioId}).populate('business section').exec()
        .then(studio =>  next(null, studio),
            err => next(err)
        )
        .catch(err => next(err));
  } else {
    return next(null, {});
  }
}


// Update Metadata for single Studio
export function addMeta(req, res) {
  if(req.user && req.user.business && (req.user.business == req.params.businessId)) {
    return Studio.findOne({business: req.params.businessId}).exec()
        .then(studio => {
          if(studio) {
            studio.metadata = req.body.metadata;
            studio.templateName = req.body.templateName;
            Section.findOneAndUpdate({_id: studio.section},
                req.body.section,
                {new: true},
                (err, newSection) => {
                  if(!studio.section && newSection) studio.section = newSection._id;
                  studio.save((err, updatedStudio) => {
                    if(err) return handleError(res)(err);
                    else return res.status(201).json(updatedStudio);
                  });
              });
          } else {
            req.body.CreatedBy = req.user;
            Section.create(req.body.section, (err, newSection) => {
              if(newSection) req.body.section = newSection;
              return Studio.create(req.body)
                  .then(respondWithResult(res, 201))
                  .catch(handleError(res));
            });
          }
        }, err => res.status(500).json(handleError(res)(err)))
        .catch(handleError(res));
  } else {
    return res.json({});
  }
}

// Update Metadata for single Studio
export function updateMeta(req, res) {
  if(req.user && req.user.business && (req.user.business == req.params.businessId)) {
    return Studio.findOne({business: req.params.businessId}).exec()
        .then(studio => {
          if(studio) {
            studio.metadata = req.body.metadata;
            studio.save((err, updatedStudio) => {
              if(err) return handleError(res)(err);
              else return res.status(201).json(updatedStudio);
            });
          } else return res.status(404).json({});
        }, err => res.status(500).json(handleError(res)(err)))
        .catch(handleError(res));
  } else {
    return res.json({});
  }
}

// Creates a new Studio in the DB
export function create(req, res) {
  req.body.features = req.body.features || [];
  Section.create({jsonPath: req.body.features}, (err, newSection) => {
    if(newSection) req.body.section = newSection;
    var metadata = {
      title: req.body.studioId
    };
    if(req.body.metaDesctription) metadata.description = req.body.metaDesctription;
    if(req.body.keywords) metadata.keywords = req.body.keywords;
    if(req.body.author) metadata.description = req.body.author;
    req.body.metadata = metadata;
    return Studio.create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  });
}

// Upserts the given Studio in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Studio.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Studio in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Studio.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Studio from the DB
export function destroy(req, res) {
  return Studio.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Verify Unicity
export function verifyUnicity(req, res) {
  var studioId = req.body.studioId;
  if(!studioId) return res.status(422).json({message: 'The website title is empty'});
  return Studio.findOne({studioId: studioId}).exec()
      .then(function(studio, err){
        if(err) return res.status(500).send(err);
        if(studio) return res.status(422).json({message: 'The title is already taken'});
        return res.status(204).json();
      })
}
