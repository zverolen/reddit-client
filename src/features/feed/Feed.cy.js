import React from 'react'
import { Feed } from './Feed'

// TODO: Loading error
//!! Currently the second test runs with .only (no unmounting of the component or anything)

describe('<Feed />', () => {
  context('Renders with the data present', () => {
    it('Renders correctly with data from file', () => {
      cy.fixture('subreddit').then((json) => {
        cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
      })
      cy.mount(<Feed />)
      cy.getByData('content').children().should('have.length', 5)
  
      // All types of news
      cy.getByData('content').children().each(($el) => {
        expect($el).to.have.descendants('p[data-test="author"]')
        expect($el).to.have.descendants('h3')
      })
    })
  })

  context('Renders when data is not loaded', () => {
    it.only('Renders the error message correctly', () => {
      cy.fixture('subreddit').then((json) => {
        cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json, statusCode: 404}).as('getError')
      })
      cy.mount(<Feed />)
      cy.getByData('error').contains('Subreddit was not loaded due to a system error. Try reloading or contact the support.')
      cy.getByData('reload-link').contains('reload')
      cy.getByData('support-link').should('have.attr', 'href').and('match', /mailto:/)
      cy.getByData('reload-link').click()
    })
  })  
})
