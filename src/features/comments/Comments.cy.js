import React from 'react'
import { Comments } from './Comments'

describe('<Comments />', () => {
  it('Renders all comments properly', () => {
    
    cy.mount(<Comments />)
    cy.get('button').click()

    cy.getByData('comments-item').should('have.length', 15);
  })
})