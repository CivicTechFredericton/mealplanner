const { defineConfig } = require('cypress')
const { verifyDownloadTasks } = require('cy-verify-downloads')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', verifyDownloadTasks)
    },

    baseUrl: 'http://localhost:3000',
  },
})
