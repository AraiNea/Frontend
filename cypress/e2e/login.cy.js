
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('go to login', () => {
    cy.visit('http://localhost:3000')
    cy.get('.header-action-btn > .d-none').click({force:true})
    cy.get('.dropdown-item').click({force:true})
   
  })
  it('Assign', () => {
    cy.visit('http://localhost:3000/login')
    cy.get(':nth-child(2) > .form-control').type('Jirayu')
    cy.get(':nth-child(3) > .form-control').type('Jaidee')
    cy.get('.btn-danger').click({force:true})
    cy.get('.swal2-confirm').click({force:true})
  })
})