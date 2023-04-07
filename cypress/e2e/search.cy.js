describe('Perform Search', () => {
  it('Shows error message when no results are found', () => {
    cy.visit("http://localhost:3000")
    cy.get('button[type="submit"]').should('have.attr', 'disabled')
    cy.get('input').type('dfsdfsdfdf')
    cy.get('button[type="submit"]').should('not.have.attr', 'disabled')
    cy.get('button[type="submit"]').click()
    cy.getByData('feed-heading').contains(`Search results for'dfsdfsdfdf'`)
    cy.getByData('error-feed-message').contains('No news found. Try another search term or report a problem')
    cy.get('input').should('not.have.value', 'dfsdfsdfdf')
    cy.get('input').should('have.value', '')
    cy.get('button[type="submit"]').should('have.attr', 'disabled')
  })

  it(`Doesn't work if the input is empty`, () => {
    cy.visit("http://localhost:3000")
    // Force click in case disabled is not set
    cy.get('button[type="submit"]').click({force: true})
    cy.getByData('feed-heading').contains('Default Feed')
  })

  //Disabled after clearing the input
})