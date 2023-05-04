import React from 'react'
import { Collapsible } from './Collapsible'

const navLinks = <ul>
                    <li><a data-endpoint="science" onClick={()=>{}} href="/science">Science (default)</a></li>
                    <li><a data-endpoint="space" onClick={()=>{}} href="/space">Space</a></li>
                    <li><a data-endpoint="scifi" onClick={()=>{}} href="/scifi">Sci-Fi</a></li>
                  </ul>;

describe('<Collapsible />', () => {
  it('Works properly with the subreddits navigation links', () => {
    cy.mount(<Collapsible children={navLinks} />)
    cy.get('button').contains('Subreddits')
    cy.getByData('dropdown').should('be.empty')
    cy.get('button').click()
    cy.getByData('dropdown').should('not.be.empty')
    cy.get('button').click()
    cy.getByData('dropdown').should('be.empty')
  })
})