describe('Navbar navigation', () => {
  it('checks backend is reachable before testing UI', () => {
    cy.request('http://localhost:3000').then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('clicks the 3rd nav-link and goes to Category page', () => {
    cy.visit('http://localhost:3000/')

    // สมมติ nav-link เป็นลิสต์ li หรือ a
    cy.get(':nth-child(2) > .nav-link').click() // index 2 คือ 3rd element

   
  })

  
})

