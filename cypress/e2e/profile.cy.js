describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/profile')
  })

  it('assign', () => {
    cy.visit('http://localhost:3000/profile')

    // ✅ รอให้ SweetAlert หายก่อนเริ่มกรอก
    cy.get('.swal2-confirm').click()
    cy.get('[name="profileName"]').should('be.visible').type('Daraporn')
    cy.get('[name="username"]').should('be.visible').type('aikeaw')
    cy.get('[name="profileSname"]').should('be.visible').type('Saepoo')
    cy.get('[name="password"]').should('be.visible').type('12345')
  })
})
