// cypress/support/e2e.js

// Import commands.js เพื่อใช้ custom commands
import './commands'

// Example: hook ก่อนทุก test
beforeEach(() => {
  cy.log('Running before each test')
})
