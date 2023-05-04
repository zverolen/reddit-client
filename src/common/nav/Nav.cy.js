import React from 'react'
import { Nav } from './Nav'

describe('<Nav />', () => {
  it('Renders correctly on small screen', () => {
    cy.mount(<Nav size={'small'} />)
    cy.get('button').click()
    cy.get('li:nth-child(1)').find('a').contains('Science (default)')
    cy.get('li:nth-child(1)').find('a').should('have.attr', 'data-endpoint', 'science')
    cy.get('li:nth-child(2)').find('a').contains('Space')
    cy.get('li:nth-child(2)').find('a').should('have.attr', 'data-endpoint', 'space')
    cy.get('li:nth-child(3)').find('a').contains('Sci-Fi')
    cy.get('li:nth-child(3)').find('a').should('have.attr', 'data-endpoint', 'scifi')
  })

  it('Renders correctly on big screen', () => {
    cy.mount(<Nav size={'big'} />)
    cy.get('li:nth-child(1)').find('a').contains('Science (default)')
    cy.get('li:nth-child(1)').find('a').should('have.attr', 'data-endpoint', 'science')
    cy.get('li:nth-child(2)').find('a').contains('Space')
    cy.get('li:nth-child(2)').find('a').should('have.attr', 'data-endpoint', 'space')
    cy.get('li:nth-child(3)').find('a').contains('Sci-Fi')
    cy.get('li:nth-child(3)').find('a').should('have.attr', 'data-endpoint', 'scifi')
  })
})