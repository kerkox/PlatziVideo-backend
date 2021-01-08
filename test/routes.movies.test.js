const assert = require('assert')
const proxyquire = require('proxyquire');

const { MoviesServiceMock, moviesMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function () {
  const route = proxyquire('../routes/movies.js', {
    '../services/movies': MoviesServiceMock
  })
  const request = testServer(route);

  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    })

    it('should respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, resp) => {
        assert.deepStrictEqual(resp.body, {
          data: moviesMock,
          message: 'movies listed'
        })
        done()
      })
    })
  })

  // describe('POST /movies', function () {
  //   it('should respond with status 200', function (done) {
  //     request.get('/api/movies').expect(200, done);
  //   })
  // })

  

})
