describe('template spec', () => {
  // เรียกใช้ทุกครั้งก่อนเทส
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.log('Running before each test')

    // ถ้ามี Swal2 popup โผล่มา
    cy.get('.swal2-container', { timeout: 10000 }).should('not.exist')
  })

  it('passes', () => {
    // แค่เช็คหน้าโหลด
    cy.url().should('include', 'localhost:3000')
  })

  it('Search', () => {
    cy.get('a.nav-link').contains('Search').should('have.attr', 'href', '/search').click()
    cy.get('input.form-control[placeholder="Search..."]').type('Pizza', { force: true })
  })

  it('Search pizza -> pizzu', () => {
    cy.get('a.nav-link').contains('Search').click()
    cy.get('input.form-control[placeholder="Search..."]').type('Pizza', { force: true })
  })

  it('filter price', () => {
    cy.get('a.nav-link').contains('Search').click()
    cy.get('#root button.btn-light').click()
    cy.get('#root input[placeholder="Min"]').type('100')
    cy.get('#root input[placeholder="Max"]').type('300')
    cy.get('#root button.text-white').click()
  })

  it('filter price and stock', () => {
    cy.get('a.nav-link').contains('Search').click()
    cy.get('#root button.btn-light').click()
    cy.get('#root input[placeholder="Min"]').type('100')
    cy.get('#root input[placeholder="Max"]').type('300')
    cy.get('#inStockCheck').check()
    cy.get('#root button.text-white').click()
  })

  it('pizza and filter price and stock', () => {
    cy.get('a.nav-link').contains('Search').click()
    cy.get('input.form-control[placeholder="Search..."]').type('Pizza', { force: true })
    cy.get('#root button.btn-light').click()
    cy.get('#root input[placeholder="Min"]').type('100')
    cy.get('#root input[placeholder="Max"]').type('300')
    cy.get('#inStockCheck').check()
    cy.get('#root button.text-white').click()
  })
})
