describe('template spec', () => {
  const username = 'alice';
  const password = 'alice123';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    // Login step
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type(username, { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type(password, { force: true });
    cy.get('#root button.btn-danger').click({ force: true });
  });

  it('passes', () => {
    // แค่เข้าเว็บ
    cy.visit('http://localhost:3000');
  });

  it('cart', () => {
    cy.get('#root img[alt="BaconHam Cheese"]').should('be.visible').click();
    cy.get('#root button.w-100').should('be.visible').click();
    cy.get('button.form-Button-Swal').should('be.visible').click();
  });

  it('dppicate cart', () => {
    cy.get('#root img[alt="BaconHam Cheese"]').should('be.visible').click();
    cy.get('#root button.w-100').should('be.visible').click();
    cy.get('button.form-Button-Swal').should('be.visible').click();
  });

  it('modify cart', () => {
    cy.get('#header button.position-relative span.d-none').should('be.visible').click();
    cy.get('#root i.bi-plus-circle').should('be.visible').click();
    cy.get('#root button.cart-checkout-btn').should('be.visible').click();
  });

  it('water soldout', () => {
    cy.get('#root img[alt="Water"]').should('be.visible').click();
  });
});
