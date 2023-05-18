import React from 'react'
import { Search } from './Search'

describe('<Search />', () => {
  it('Renders correctly', () => {
    cy.mount(<Search />)
    cy.get('form').should('have.attr', 'role', 'search')
    cy.get('label').contains('Search headlines (case-sensitive):').and('have.attr', 'for', 'search-input')
    cy.get('input').should('have.attr', 'type', 'search').and('have.attr', 'id', 'search-input')
    cy.getByData('search-button').contains('Search')
  })

  it('Has all states (e.g. disabled, focused)', () => {
    cy.mount(<Search />)
    cy.getByData('search-button').should('be.disabled')
    cy.get('input').click()
    cy.get('input').should('have.focus')
    cy.get('input').type('Word').should('have.value', 'Word')
    cy.getByData('search-button').should('not.be.disabled')
    cy.getByData('search-button').focus()
    cy.getByData('search-button').should('have.focus')
    cy.get('input').click()
    cy.get('input').should('have.focus')
    cy.get('input').clear()
    cy.getByData('search-button').should('be.disabled')
  })
})