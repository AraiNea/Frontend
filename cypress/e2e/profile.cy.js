describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/profile')
  })
  it('assign', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('[name="profileName"]').type('Daraporn')
    cy.get('[name="username"]').type('aikeaw')
    cy.get('[name="profileSname"]').type('Saepoo')
    cy.get('[name="password"]').type('12345')
    
  })
})