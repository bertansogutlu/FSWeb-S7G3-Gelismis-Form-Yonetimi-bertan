describe('My First Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('Isim gir', () => {
    cy.get('[data-cy="name"]').type("Bertan").should("have.text","Bertan");
  })

})