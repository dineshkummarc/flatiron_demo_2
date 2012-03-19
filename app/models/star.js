var resourceful = require('resourceful');

var Star = resourceful.define('star', function () {
  var self = this;
	
  //
  // Storage engine and collection name
  //
  // this.use('mongodb', { collection: 'systems' });
  self.use('memory');
  
  //
  // Properties with validation
  //
  self.property('name', String); // Defaults to String
  self.property('klass', String);
  self.property('code', String);
  self.property('color', String);
  self.property('radius', Number);
  self.property('mass', Number);
  self.property('luminosity', Number);
  
  // Basic star types, distribution and attributes
  self.types = [
    { code: 'O', frequency: 0.0000333, name: 'Blue', color: '#a0a0f4', radius: 4, mass: 12, orbits: {} },
    { code: 'B', frequency: 0.00325, name: 'Blue / White', color: '#cccce7', radius: 2, mass: 6, orbits: { veryhot: 3 } },
    { code: 'M', frequency: 0.004, name: 'Red Giant', color: '#c70003', radius: 3, mass: 1, orbits: {} },
    { code: 'A', frequency: 0.01625, name: 'White', color: '#ffffff', radius: 1.6, mass: 1.4, orbits: { veryhot: 3 } },
    { code: 'F', frequency: 0.033, name: 'Yellow / White', color: '#ffffbc', radius: 1.3, mass: 1.2, orbits:  { hot: 3, habital: 2, almosthabital: 2, cold: 3, verycold: 3 } },
    { code: 'D', frequency: 0.04, name: 'Degenerate', color: '#555555', radius: 0.45, mass: 1, orbits: {} },
    { code: 'G', frequency: 0.077, name: 'Yellow', color: '#ffff62', radius: 1, mass: 1, orbits:  { hot: 2, habital: 2, almosthabital: 1, cold: 2, verycold: 2 } },
    { code: 'K', frequency: 0.1165, name: 'Orange', color: '#ffd280', radius: 0.9, mass: 0.6, orbits:  { hot: 1, habital: 1, almosthabital: 1, cold: 2, verycold: 1 } },
    { code: 'M', frequency: 0.71, name: 'Red', color: '#c70003', radius: 0.6, mass: 0.27, orbits:  { hot: 1, habital: 1, almosthabital: 0, cold: 2, verycold: 1 } }
  ];
  
  // Builds a star with random attributes, but that follow the basic distribution
  self.generate = function (attrs, callback) {

    if (this._timestamps) {
      attrs.ctime = attrs.mtime = Date.now();
    }

    var self = this;
    var instance = new(self)(attrs);
    var frequency = 0;
    var probability = Math.random();

    for (type in self.types) {
      var klass = self.types[type];
      var start = frequency;
      frequency = frequency + klass.frequency;

      if(probability > start && probability < frequency) {
        instance.klass      = klass.name;
        instance.color      = klass.color;
        instance.radius     = klass.radius * ((Math.random() * .4) + .8);
        instance.mass       = klass.mass * ((Math.random() * .4) + .8);
        instance.luminosity = parseInt(Math.random() * 10);
        instance.code       = klass.code + instance.luminosity;
        // instance.orbits     = klass.orbits;
        break;
      }
    };
    
    if ( callback ){
      callback(null, instance);
    }

  };
  
});

exports.Star = Star;