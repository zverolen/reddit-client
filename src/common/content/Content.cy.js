import React from 'react'
import { Content } from './Content'

describe('Correctly renders on small size', () => {
  before(()=>{
    cy.viewport('iphone-xr')
  })

  it('Nav renders before Feed', () => {
    cy.mount(<Content />)
    cy.getByData('global-content').children().first().should('have.attr', 'data-test', 'nav')
    cy.getByData('global-content').children().last().should('have.attr', 'data-test', 'feed')
  }) 
})

describe('Correctly renders on big size', () => {
  before(()=>{
    cy.viewport('macbook-16')
  })

  it('Feed renders before Nav', () => {
    cy.mount(<Content />)
    cy.getByData('global-content').children().first().should('have.attr', 'data-test', 'feed')
    cy.getByData('global-content').children().last().should('have.attr', 'data-test', 'nav')
  })
})