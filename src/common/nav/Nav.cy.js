import React from 'react'
import { Nav } from './Nav'

describe('<Nav />', () => {
  it('Renders correctly on small screen', () => {
    cy.mount(<Nav size={'small'} />)
    cy.get('button').click()
    cy.get('nav').find('a:nth-child(1)').contains('Science')
    cy.get('nav').find('a:nth-child(1)').should('have.attr', 'data-endpoint', 'science')
    cy.get('nav').find('a:nth-child(2)').contains('Space')
    cy.get('nav').find('a:nth-child(2)').should('have.attr', 'data-endpoint', 'space')
    cy.get('nav').find('a:nth-child(3)').contains('Sci-Fi')
    cy.get('nav').find('a:nth-child(3)').should('have.attr', 'data-endpoint', 'scifi')
  })

  it('Renders correctly on big screen', () => {
    cy.mount(<Nav size={'big'} />)
    cy.get('nav').find('a:nth-child(1)').contains('Science')
    cy.get('nav').find('a:nth-child(1)').should('have.attr', 'data-endpoint', 'science')
    cy.get('nav').find('a:nth-child(2)').contains('Space')
    cy.get('nav').find('a:nth-child(2)').should('have.attr', 'data-endpoint', 'space')
    cy.get('nav').find('a:nth-child(3)').contains('Sci-Fi')
    cy.get('nav').find('a:nth-child(3)').should('have.attr', 'data-endpoint', 'scifi')
  })
})