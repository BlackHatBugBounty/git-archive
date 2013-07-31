module.exports = function (data, cb) {
  var command = 'git archive '

  // allow optional flags to be passed
  if (data.flags) {
    command += ' ' + data.flags.join(' ')
  }
}
