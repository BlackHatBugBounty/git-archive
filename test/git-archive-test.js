var path = require('path')
var temp = require('temp')
var rimraf = require('rimraf')
var assert = require('assert')
var fs = require('fs')
var should = require('should')

var gitArchive = require('../')
describe('Git Archive', function() {
  it('should archive bare repo to tarball at given output path', function(done) {
    var repoPath = path.join(__dirname, 'data/repos/apples_bare.git')
    var outputPath = temp.path({suffix: 'apples.tar.gz'})
    var data = {
      commit: '5de4caa20708131b1b29d3b6b3dea58e69d2c99c',
      outputPath: outputPath,
      repoPath: repoPath
    }
    gitArchive(data, function (err, reply) {
      should.not.exist(err)
      reply.should.eql(outputPath, 'reply should eql outputPath')
      assert.ok(fs.existsSync(outputPath), 'archive not found at output path: ' + outputPath)
      rimraf(outputPath, done)
    })
  })

  it('should give error when commit is invalid for given git repo', function (done) {
    var repoPath = path.join(__dirname, 'data/repos/apples_bare.git')
    var outputPath = temp.path({suffix: 'apples.tar.gz'})
    var data = {
      commit: 'fakeSha1Here',
      outputPath: outputPath,
      repoPath: repoPath
    }
    gitArchive(data, function (err, outputPath) {
      should.exist(err)
      err.message.should.eql('failed to archive git commit')
      should.exists(err.stderr)
      should.not.exist(outputPath, 'no reply should be returned')
      done()
    })
  })
});
