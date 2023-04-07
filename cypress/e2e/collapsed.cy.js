// Using semantic attributes for enforcing accessibility and mindfulness

describe('Interactive collapsible elements', () => {
  it('Feeds Navigation Component with Error', () => {
    cy.visit("http://localhost:3000")
    cy.get('button:not([type="submit"])').should('have.attr', 'aria-expanded', 'false')
    cy.get('button:not([type="submit"])').contains('Expand')
    cy.getByData('toggle-feedsNav-heading').next().should('not.exist')

    cy.get('button:not([type="submit"])').click()
    cy.get('button:not([type="submit"])').contains('Collapse')
    cy.get('button:not([type="submit"])').should('have.attr', 'aria-expanded', 'true')
    cy.getByData('toggle-feedsNav-heading').next().should('exist')


    cy.get('button:not([type="submit"])').click()
    cy.get('button:not([type="submit"])').contains('Expand')
    cy.get('button:not([type="submit"])').should('have.attr', 'aria-expanded', 'false')
    cy.getByData('toggle-feedsNav-heading').next().should('not.exist')
  });
  //TODO: extract common check like all buttons should have this attribute
});