// cypress/support/commands.js

// ตัวอย่าง custom command
Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('[data-cy=login-button]').click()
  })
  