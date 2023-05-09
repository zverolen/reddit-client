import React from 'react'
import { Search } from './Search'

describe('<Search />', () => {
  it('Renders correctly', () => {
    cy.mount(<Search />)
    cy.get('label').contains('Search headlines (case-sensitive):').and('have.attr', 'for', 'search-input')
    cy.get('input').should('have.attr', 'type', 'search').and('have.attr', 'id', 'search-input')
    cy.get('button').contains('Search')
    cy.get('button').should('be.disabled')
    cy.get('input').click()
    cy.get('input').should('have.focus')
    cy.get('input').type('Word').should('have.value', 'Word')
    cy.get('button').should('not.be.disabled')
    cy.get('button').focus()
    cy.get('button').should('have.focus')
    cy.get('input').click()
    cy.get('input').should('have.focus')
    cy.get('input').clear()
    cy.get('button').should('be.disabled')
  })
})