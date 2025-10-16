describe('Navbar navigation', () => {
    it('checks backend is reachable before testing UI', () => {
      cy.request('http://localhost:3000').then((res) => {
        expect(res.status).to.eq(200)
      })
    })

    it('clicks the 3rd nav-link', () => {
      
      cy.visit('http://localhost:3000/')
      
      
      describe('Category Page E2E', () => {
        beforeEach(() => {
          // เข้าเว็บ Category
          cy.visit('http://localhost:3000/category'); // ปรับ URL ตามโปรเจกต์ของคุณ
        });
      
        it('should load categories and click Pizza', () => {
          // รอให้ categories โหลด (อาจรอ element ของ Pizza)
          cy.contains('Loading categories...').should('exist'); // ตรวจสอบข้อความโหลด
          cy.intercept('GET', 'http://localhost:8080/category/').as('getCategories');
          cy.wait('@getCategories'); // รอ API ตอบ
      
          // ตรวจสอบว่า Pizza มีในหน้า
          cy.contains('Pizza').should('be.visible');
      
          // คลิกที่ Pizza
          cy.contains('Pizza').click();
      
          // ตัวอย่าง: ตรวจสอบว่าคลิกแล้ว URL เปลี่ยน (ถ้ามี route สำหรับ category)
          // cy.url().should('include', '/category/pizza');
        });
      });
      



    })
  })
