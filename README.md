# Git Archive

Module to take a bare git repo, archive it, and export it as a tarball to a given path

# Installation

```bash
npm install -S git-archive
```

# Usage

Say for example you have a repo named `apples` and you want to export the repo as a tarball named `apples.tar.gz` in the current directory. The export archive must reference a sha1 hash

```javascript
var gitArchive = require('git-archive')
var commitHash = 'c3f9bcb782bcfc0216cef5c7f68f6f86cd3bea8a'
var bareRepoDir = '/path/to/bare/repo.git'
var outputPath = path.join(__dirname, 'apples.tar.gz')
var data = {
  commit: commitHash,
  outputPath: outputPath,
  repoDir: bareRepoDir
}
gitArchive(data, function(err, reply) {
  var error
  if (err) {
    error = new Error('failed to archive git commit in repo and export as a tarball')
    error.source = err
    throw Error // or pass the error to a callback
  }
  console.log('git archived to tarball at path %s', reply)
})
```


