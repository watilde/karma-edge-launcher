var fs  = require('fs')
var path = require('path')
var urlparse = require('url').parse
var urlformat = require('url').format
var find = require('lodash.find')
var PROCESS_NAME = 'MicrosoftEdge.exe'

function EdgeBrowser (baseBrowserDecorator, args) {
  baseBrowserDecorator(this)

  var flags = args.flags || []
  this._getOptions = function (url) {
    return flags.concat(url)
  }
}

function getEdgeExe () {
  // Only run these checks on win32
  if (process.platform !== 'win32') {
    return null
  }

  var microsoftEdgeExe, microsoftEdgeDirectory, i, prefix, location
  var suffix = '\\SystemApps\\'
  var prefixes = [process.env.WINDIR, process.env.SYSTEMDIR]

  for (i = 0; i < prefixes.length; i++) {
    if (microsoftEdgeDirectory) continue
    prefix = prefixes[i]
    location = path.join(prefix, suffix)
    if (fs.existsSync(location)) microsoftEdgeDirectory = location
  }

  microsoftEdgeDirectory += find(fs.readdirSync(location), function (directory) {
    return directory.indexOf('Microsoft.MicrosoftEdge') !== -1
  })

  microsoftEdgeExe = path.join(microsoftEdgeDirectory, PROCESS_NAME)
  return microsoftEdgeExe
}

EdgeBrowser.prototype = {
  name: 'Edge',
  DEFAULT_CMD: {
    win32: getEdgeExe()
  },
  ENV_CMD: 'EDGE_BIN'
}

EdgeBrowser.$inject = ['baseBrowserDecorator', 'args']

module.exports = {
  'launcher:Edge': ['type', EdgeBrowser]
}
