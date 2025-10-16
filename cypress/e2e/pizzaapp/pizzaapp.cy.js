describe('Navbar navigation', () => {
  it('checks backend is reachable before testing UI', () => {
    cy.request('http://localhost:3000').then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('clicks Category nav-link and goes to Category page', () => {
    cy.visit('http://localhost:3000/')

    // รอ overlay ถ้ามี
    cy.get('.swal2-container').should('not.exist')

    // คลิก nav-link ไปหน้า Category
    cy.contains('a', 'Category').click()

    // ตรวจสอบ URL
    cy.url().should('include', '/category')
  })
})
