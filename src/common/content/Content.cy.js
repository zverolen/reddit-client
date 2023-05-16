import React from 'react'
import { Content } from './Content'

describe('Nav and Feed render', () => {

  it('Nav renders before Feed', () => {
    cy.mount(<Content />)
    cy.getByData('global-content').children().last().should('have.attr', 'data-test', 'feed')
    cy.getByData('global-content').children().first().should('have.attr', 'data-test', 'nav')
  }) 
})