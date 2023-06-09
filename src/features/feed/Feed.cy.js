import React from 'react'
import { Feed } from './Feed'
import { search, setView, fakeSetStatus } from './feedSlice'
import { store } from '../../app/store'

//!! Currently the third test runs with .only (no unmounting of the component or anything) 

describe('<Feed />', () => {
  it('Renders correctly with data from file', () => {
    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    // })
    cy.mount(<Feed />)
    cy.getByData('content').children().should('have.length', 6)

    // All types of news
    cy.getByData('content').children().each(($el) => {
      expect($el).to.have.descendants('p[data-test="author"]')
      expect($el).to.have.descendants('h3')
    })
  })

  it('Renders correctly with the search term "JUICE"', () => {
    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    // })
    store.dispatch(search('JUICE'));
    store.dispatch(setView('search'));
    cy.mount(<Feed />)
    cy.getByData('feed-heading').contains('Search results for the term "JUICE":')
    cy.getByData('content').children().should('have.length', 3)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
    cy.getByData('content').find('> div:nth-child(3) h3').contains('We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim.')
  })

  it('Renders correct error message if the search phrase is not found', () => {
    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    // })
    store.dispatch(search('фваващдоыва'));
    store.dispatch(setView('search'));
    cy.mount(<Feed term={'фваващдоыва'}/>)
    cy.getByData('feed-heading').contains('No results for your phrase "фваващдоыва".')
    cy.getByData('error').contains('Try another phrase or contact the support')
    cy.getByData('support-link').should('have.attr', 'href').and('match', /mailto:/)
  })

  it('Renders the error message correctly', () => {
    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json, statusCode: 404}).as('getError')
    // })
    store.dispatch(setView('subreddit'))
    store.dispatch(fakeSetStatus('failed'))
    cy.mount(<Feed />)
    cy.getByData('error').contains('Subreddit was not loaded due to a system error. Try reloading or contact the support.')
    cy.getByData('reload-link').contains('reload')
    cy.getByData('support-link').should('have.attr', 'href').and('match', /mailto:/)
    cy.getByData('reload-link').click()
  })
})
