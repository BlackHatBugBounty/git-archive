var exec = require('child_process').exec

module.exports = function(data, cb) {

  var error = validateData(data)
  if (error) {
    return cb(error)
  }
  var repoPath = data.repoPath
  var outputPath = data.outputPath
  var command = buildCommand(data)
  var opts = {
    cwd: repoPath
  }
  exec(command, opts, function (err, stdout, stderr) {
    var error
    if (err) {
      error = new Error('failed to archive git commit')
      error.source = err
      error.stdout = stdout
      error.stderr = stderr
      return cb(error)
    }
    return cb(null, outputPath)
  })
}

function buildCommand(data) {
  var commit = data.commit
  var outputPath = data.outputPath
  var command = 'git archive -o ' + outputPath + ' ' + commit
  // allow optional flags to be passed
  if (data.flags) {
    command += ' ' + data.flags.join(' ')
  }
  return command
}

function validateData(data) {
  var error
  if (!data.commit) {
    error = new Error('failed to archive data. Missing key')
    error.source = 'commit field missing in data object'
    return error
  }
  if (!data.outputPath) {
    error = new Error('failed to archive data. Missing key')
    error.source = 'commit field missing in data object'
    return error
  }
  if (!data.repoPath) {
    error = new Error('failed to archive data. Missing key')
    error.source = 'repoPath field missing in data object'
    return error
  }
  return error
}
