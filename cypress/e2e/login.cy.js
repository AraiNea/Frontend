
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

  
    // กรอกข้อมูล login
    // username
    cy.get('input[placeholder="Value"]').eq(0).type('Jirayu', { force: true })

    // password
    cy.get('input[placeholder="Value"]').eq(1).type('Jaidee', { force: true })
    cy.get('.btn-danger').click({force:true})

    
  
  })
})