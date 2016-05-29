function EdgeBrowser (baseBrowserDecorator, logger, args) {
  baseBrowserDecorator(this)
}

EdgeBrowser.prototype = {
  name: 'Edge',
  DEFAULT_CMD: {
    win32: 'start microsoft-edge'
  },
  ENV_CMD: 'EDGE_BIN'
}

EdgeBrowser.$inject = ['baseBrowserDecorator', 'logger', 'args']

module.exports = {
  'launcher:Edge': ['type', EdgeBrowser]
}
