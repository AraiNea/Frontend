const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // Set the desired window size for headless Chrome
          launchOptions.args.push('--window-size=1400,1200')
          // Optionally, force screen to be non-retina if needed
          // launchOptions.args.push('--force-device-scale-factor=1') 
        }
        return launchOptions
      })
    },
  },
})
