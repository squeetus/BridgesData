'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var structure = {
  'id': 'String',
  'city': 'String',
  'state': 'String',
  'country': 'String',
  'lat': 'Number',
  'lon': 'Number',
  'elevation': 'Number',
  'population': 'Number',
  'timezone': 'String'
};

var WorldCitySchema = new Schema({
  id: String,
  city: String,
  state: String,
  country: String,
  lat: Number,
  lon: Number,
  elevation: Number,
  population: Number,
  timezone: String
});

module.exports = {'model': mongoose.model('WorldCity', WorldCitySchema), 'structure': structure};
