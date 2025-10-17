describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/profile')
  })

  it('assign', () => {
    cy.visit('http://localhost:3000/profile')

    // ✅ รอให้ SweetAlert หายก่อนเริ่มกรอก
    cy.get('.swal2-confirm').click({ force: true })
    cy.get('[name="profileName"]').should('be.visible').type('Daraporn', { force: true })
    cy.get('[name="username"]').should('be.visible').type('aikeaw', { force: true })
    cy.get('[name="profileSname"]').should('be.visible').type('Saepoo', { force: true })
    cy.get('[name="password"]').should('be.visible').type('12345', { force: true })
    cy.get('.mt-4 > .btn').click({ force: true })
    cy.get('.swal2-confirm').click({ force: true })
  })
})
