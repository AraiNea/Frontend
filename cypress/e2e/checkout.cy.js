describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('checkout', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root img[alt="BBQ Smoked"]').click();
    cy.get('#root button.w-100').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#header button.position-relative span.d-none').click();
    cy.get('#root button.cart-checkout-btn').click();
    cy.get('#root button.btn-checkout').click();
    cy.get('button.form-Button-Swal').click();
  })

  it('checkout with discount', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root img[alt="BBQ Smoked"]').click();
    cy.get('#root button.w-100').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#header i.bi-cart3').click();
    cy.get('#root input.discount-code-input').click();
    cy.get('#root input.discount-code-input').type('BBQ25');
    cy.get('#root button.discount-code-btn').click();
  })

  it('checkout with wrong discount', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root img[alt="BBQ Smoked"]').click();
    cy.get('#root button.w-100').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#header i.bi-cart3').click();
    cy.get('#root input.discount-code-input').click();
    cy.get('#root input.discount-code-input').type('maiwaileaw');
    cy.get('#root button.discount-code-btn').click();
  })
})