describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    cy.get('#root button.btn-danger').click({ force: true });
  })

  it('dppicate cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    cy.get('#root button.btn-danger').click({ force: true });
    cy.get('#root img[alt="Recommended 3"]').click({ force: true });
    cy.get('#root button.w-100').click({ force: true });
  })

  it('modify cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    cy.get('#root button.btn-danger').click({ force: true });
    cy.get('#root section:nth-child(3) div:nth-child(3) div.card div.card-body h5.mb-1').click({ force: true });
    cy.get('#header button.position-relative').click({ force: true });
    cy.get('#root div:nth-child(3) i.bi-plus-circle').click({ force: true });
    cy.get('#root div:nth-child(4) i.bi-dash-circle').click({ force: true });
    cy.get('#root div:nth-child(5) i.bi-plus-circle').click({ force: true });
    cy.get('#root button.cart-checkout-btn').click({ force: true })
        
  })

  it('water soldout', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    cy.get('#root button.btn-danger').click({ force: true });
    cy.get('#root section:nth-child(3) div:nth-child(3) div.card div.card-body h5.mb-1').click({ force: true });
  })
})
