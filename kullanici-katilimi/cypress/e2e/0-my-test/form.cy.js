describe('My First Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Test calisiyor', () => {
    expect(true).to.equal(true)
  })

  it('Inputlari gir', () => {
    cy.get('h2').contains('Formu eksiksiz doldurunuz.');
    cy.get('#name-id').type("Bertan").should("have.value","Bertan");
    cy.get('#surname-id').type("Sogutlu").should("have.value","Sogutlu");
    cy.get('#email-id').type("bertan@gmail.com").should("have.value","bertan@gmail.com");
    cy.get('#password-id').type("123456").should("have.value","123456");
    cy.get('#checkbox-id').check().should('be.checked');
    cy.get('#radio-id-1').check().should('be.checked');
    cy.contains('Temizle').click();
    cy.get('#name-id').should("be.empty");
    cy.get('#surname-id').should("be.empty");
    cy.get('#email-id').should("be.empty");
    cy.get('#password-id').should("be.empty");
    cy.get('#checkbox-id').should("not.be.checked");
    cy.get('#radio-id-1').should("not.be.checked");
    cy.get('#radio-id-2').should("not.be.checked");
    cy.get('#radio-id-3').should("not.be.checked");
  })

  it('Kullanim sartlari butonu', () => {
    cy.contains('Temizle').click();
    cy.get('#checkbox-id').uncheck();
    cy.get('#checkbox-id').check();
  })

  it('Radio butonu', () => {
    cy.get('#radio-id-2').check();
    cy.get('#radio-id-1').should("be.empty");
    cy.get('#radio-id-3').should("be.empty");
    cy.get('#radio-id-3').check();
    cy.get('#radio-id-2').should("be.empty");
    cy.get('#radio-id-3').should("be.empty");
  })

  it('Gonder', () => {
    cy.get('h2').contains('Formu eksiksiz doldurunuz.');
    cy.get('#name-id').type("Bertan").should("have.value","Bertan");
    cy.get('#surname-id').type("Sogutlu").should("have.value","Sogutlu");
    cy.get('#email-id').type("bertan@gmail.com").should("have.value","bertan@gmail.com");
    cy.get('#password-id').type("123456").should("have.value","123456");
    cy.get('#checkbox-id').check();
    cy.get('#radio-id-1').check();
    cy.contains('Gönder').click();
  })

  it('Eksik gonder', () => {
    cy.contains('Gönder').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Lutfen boş alanları doldurunuz.`)
    })
  })

})