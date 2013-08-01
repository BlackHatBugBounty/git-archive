var path = require('path')
var temp = require('temp')
var rimraf = require('rimraf')
var assert = require('assert')
var fs = require('fs')
var should = require('should')
var inspect = require('eyespect').inspector()

var gitArchive = require('../')
describe('Git Archive', function() {
  it('should archive bare repo to tarball at given output path', function(done) {
    var repoDir = path.join(__dirname, 'data/repos/apples_bare.git')
    var outputPath = temp.path({suffix: 'apples.tar.gz'})
    var data = {
      commit: '5de4caa20708131b1b29d3b6b3dea58e69d2c99c',
      outputPath: outputPath,
      repoDir: repoDir
    }
    gitArchive(data, function (err, reply) {
      should.not.exist(err)
      reply.should.eql(outputPath)
      assert.ok(fs.existsSync(outputPath), 'archive not found at output path: ' + outputPath)
      rimraf(outputPath, done)
    })
  })

  it('should give error when commit is invalid for given git repo', function (done) {
    var repoDir = path.join(__dirname, 'data/repos/apples_bare.git')
    var outputPath = temp.path({suffix: 'apples.tar.gz'})
    var data = {
      commit: 'fakeSha1Here',
      outputPath: outputPath,
      repoDir: repoDir
    }
    gitArchive(data, function (err, reply) {
      should.exist(err)
      inspect(err, 'error in git archive')
      should.not.exist(reply)
      done()
    })
  })
});