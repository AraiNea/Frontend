describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header button:nth-child(2) span.d-none').click();
    cy.get('#root div:nth-child(2) button.trackorder-reorder').click();
    cy.get('button.swal2-confirm').click();
  })
})