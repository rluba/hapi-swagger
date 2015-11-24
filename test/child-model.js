/*
Mocha test
This test was created for issue #103
*/


var Lab             = require('lab'),
    Code            = require('code'),
    Joi            	= require('joi'),
	  Helper          = require('../test/helper.js');

var lab     = exports.lab = Lab.script(),
    expect  = Code.expect;


lab.experiment('child-models', function () {
  
   var requestOptions = {
    method: 'GET',
    url: '/swagger.json',
    headers: {
      host: 'localhost'
    }
  };
  
  var routes = {
        method: 'POST',
        path: '/foo/v1/bar',
        config: {
          description: '...',
          tags: ['api'],
          validate: {
            payload: Joi.object({
              outer1: Joi.object({
                inner1: Joi.string()
              }),
              outer2: Joi.object({
                inner2: Joi.string()
              })
            })
          },
          handler: function () {}
        }
      };
  
  
  
  lab.test('child', function (done) {

      Helper.createServer( {}, routes, function(err, server){
          server.inject(requestOptions, function(response) {
            expect(err).to.equal(null);
              //console.log(JSON.stringify(response.result));
              expect(response.statusCode).to.equal(200);
              expect(response.result.paths['/foo/v1/bar'].post.parameters[0].schema).to.deep.equal({
                    "$ref": "#/definitions/foov1bar_payload"
                });
              expect(response.result.definitions.foov1bar_payload).to.deep.equal({
                    "properties": {
                        "outer1": {
                            "properties": {
                                "inner1": {
                                    "type": "string"
                                }
                            }
                        },
                        "outer2": {
                            "properties": {
                                "inner2": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "type": "object"
                });
              done();
          });
      });
  });
    
  
  
});




/*
var Chai            = require('chai'),
    Hapi            = require('hapi'),
    Joi             = require('joi'),
    Inert           = require('inert'),
    Vision          = require('vision'),
    Hoek            = require('hoek'),
    HapiSwagger     = require('../lib/index.js');
    assert          = Chai.assert;


var defaultHandler = function(request, response) {
  reply('ok');
};


describe('model structure', function() {
  
  var server
  
  beforeEach(function(done) {
    server = new Hapi.Server();
    server.connection();
    server.register([Inert, Vision, HapiSwagger], function(err){
      server.start(function(err){
        assert.ifError(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    server.stop(function() {
      server = null;
      done();
    });
  });
  

  it('should support child models', function(done) {

      server.route([{
        method: 'POST',
        path: '/foo/v1/bar',
        config: {
          description: '...',
          tags: ['api'],
          validate: {
            payload: Joi.object({
              outer1: Joi.object({
                inner1: Joi.string()
              }),
              outer2: Joi.object({
                inner2: Joi.string()
              })
            })
          },
          handler: function () {}
        }
      }]);


      server.inject({ method: 'GET', url: '/docs?path=foo '}, function (response) {
        //console.log(JSON.stringify(response.result.models));

        var outer1 = JSON.parse(JSON.stringify(response.result.models.outer1));
        assert.deepEqual(outer1, {
          "id": "outer1",
          "type": "object",
            "properties": {
              "inner1": {
              "type": "string",
              "defaultValue": null
            }
          }
        });

        var outer2 = JSON.parse(JSON.stringify(response.result.models.outer2));
        assert.deepEqual(outer2, {
          "id": "outer2",
          "type": "object",
            "properties": {
              "inner2": {
              "type": "string",
              "defaultValue": null
            }
          }
        });

        var foov1bar = JSON.parse(JSON.stringify(response.result.models.foov1bar));
        assert.deepEqual(foov1bar, {
          "id": "foov1bar",
          "type": "object",
          "properties": {
            "outer1": {
              "type": "outer1",
              "defaultValue": null
            },
            "outer2": {
              "type": "outer2",
              "defaultValue": null
            }
          }
        });

        done();
      });

    });

});
*/