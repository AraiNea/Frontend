describe('Navbar and Category E2E', () => {

  it('checks backend is reachable', () => {
    cy.request('http://localhost:3000').then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('navigates to Category page via Navbar', () => {
    cy.visit('http://localhost:3000/')

    // รอ SweetAlert overlay ถ้ามี
    cy.get('.swal2-container').should('not.exist')

    // คลิก nav-link Category
    cy.contains('a', 'Category').click({ force: true })

    // ตรวจสอบว่า URL เปลี่ยน
    cy.url().should('include', '/category')
  })
  it('god pizza', () => {
    cy.visit('http://localhost:3000/')

    cy.get(':nth-child(1) > .row > :nth-child(1) > .card > .card-body').click({ force: true })
  })
  
  it('god back', () => {
    cy.visit('http://localhost:3000/product/1')
    cy.get('.container > .d-flex').click({ force: true })

    
  })
  it('god navbar2', () => {
    cy.visit('http://localhost:3000/category')
    cy.get('.category-2').click({ force: true })

    
  })
  it('god garlicbread', () => {
    cy.visit('http://localhost:3000/category/appetizer')
    cy.get(':nth-child(1) > .card > .card-body').click({ force: true })

    
  })
  it('god back', () => {
    cy.visit('http://localhost:3000/product/6')
    cy.get('.container > .d-flex').click({ force: true })

    
  })

  it('god navbar3', () => {
    cy.visit('http://localhost:3000/category')
    cy.get('.category-3').click({ force: true })

    
  })

  it('god garlicbread', () => {
    cy.visit('http://localhost:3000/category/drink')
    cy.get(':nth-child(1) > .card > .card-body').click({ force: true })

    
  })

  it('god back', () => {
    cy.visit('http://localhost:3000/product/9')
    cy.get('.container > .d-flex').click({ force: true })

    
  })

})
