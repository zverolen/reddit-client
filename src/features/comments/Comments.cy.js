import React from 'react'
import { Comments } from './Comments'

describe('<Comments />', () => {
  it('Renders all comments properly', () => {
    //This request doesn't work or something is wrong
    cy.fixture('comments').then((comments) => {
      cy.intercept('GET', 
                  'https://www.reddit.com/r/science/comments/13loi0l/more_than_half_of_the_worlds_largest_lakes_and/}.json', 
                  comments
                ).as('getComments')
    })
    cy.mount(<Comments />)

    cy.getByData('comments-item').should('have.length', 14);
  })
})