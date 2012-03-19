var flatiron = require('flatiron'),
    app = flatiron.app,
    players = require('./players.js'),
    System = require('../../app/models/system.js').System;

var Controllers = {
  
  index: function(name){
    var self = this;
    
    players.authenticate(self, function(err, player){  
      if(err) return callback(err); 
      System.all(function(err, systems){ 
        if(err) return callback(err); 
        var data = {
              systems: systems.map(function(p){ return p.toJSON(); }),
              player: player.toJSON()
            };
        
        app.render('systems/index', data, function(template){
          app.render_layout(self, template);
        }); 
      });
    });
  },
  
  show: function(id){
    var self = this;
    players.authenticate(self, function(err, player){
      if(err) return callback(err); 
      System.all(function(err, systems){
        if(err) return callback(err);
        if(planets.length){
          var system = systems.find(function(s){ return s._id == id }),
              data = {
                system: system,
                systems: systems
              }
          app.render('systems/index', data, function(template){
            app.render_layout(self, template);
          });   
        } else {
          app.render_layout('<h1>' + slug + ' is not a planet.</h1>');
        }
      });
    });
  }
  
}

exports.controllers = Controllers;