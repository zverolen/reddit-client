describe('Initial render of the feed', () => {
  
  context('Header', () => {
    it('Renders all elements', () => {
      cy.visit("http://localhost:3000")

      cy.get('header').should('exist')
      cy.get('main').should('exist')
      cy.get('header').find('a').contains('Reddit Client')
      cy.get('header').find('form').should('exist')
      cy.get('form').find('input').should('exist')
      cy.get('form').find('label').should('exist')
      cy.get('form').find('button[type="submit"]').should('exist')
      cy.get('button[type="submit"]').contains('Submit')
    })
  })

  context('Main', () => {
    it('Renders all elements', () => {
      cy.visit("http://localhost:3000")

      cy.get('h2').contains('Choose News Feed')
      cy.get('h2').contains('Default Feed')
      cy.getByData('error-feed-message').contains('System Error. Feed was not loaded. Try reloading or contact the support.')
    });
  })
})