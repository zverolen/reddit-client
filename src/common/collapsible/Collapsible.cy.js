import React from 'react'
import { Collapsible } from './Collapsible'
import { data } from '../../data/testingDataComments';

const content = <div data-test="comments-content">
                  <div data-test="comments-item">
                    <p data-test="comments-author">AutoModerator</p>
                    <p data-test="comments-created">1684434487</p>
                    <p data-test="comments-text">Welcome to r/science!</p>
                    <hr></hr>
                  </div>
                  <div data-test="comments-item">
                    <p data-test="comments-author">AbouBenAdhem</p>
                    <p data-test="comments-created">1684438020</p>
                    <p data-test="comments-text">&amp;gt; The model suggests the earliest population split among early humans that is detectable in contemporary populations occurred 120,000 to 135,000 years among</p>
                    <hr></hr>
                  </div>
                  <div data-test="comments-item">
                    <p data-test="comments-author">Yuri909</p>
                    <p data-test="comments-created">1684448816</p>
                    <p data-test="comments-text">Makes sense to me. The timeline isn't new. H. sapiens sapiens is long thought to be about 400k years old</p>
                    <hr></hr>
                  </div>
                </div>

const commentsContent = <div>
                          <h3>Comments</h3>
                          {content}
                        </div>

const navContent = <ul>
                    <li><a data-endpoint="science" onClick={()=>{}} href="/science">Science (default)</a></li>
                    <li><a data-endpoint="space" onClick={()=>{}} href="/space">Space</a></li>
                    <li><a data-endpoint="scifi" onClick={()=>{}} href="/scifi">Sci-Fi</a></li>
                  </ul>

describe('<Collapsible /> with navigation', () => {
  it('Works properly with the subreddits navigation links', () => {
    cy.mount(<Collapsible
      children={navContent}
      openActionName="Show subreddits" 
      closeActionName="Hide subreddits"
      additionalActionRequired={false}
    />)

    cy.get('button').should('have.text', 'Show subreddits')
    cy.getByData('dropdown').should('be.empty')
    cy.get('button').click()
    cy.getByData('dropdown').should('not.be.empty')
    cy.get('button').should('have.text', 'Hide subreddits')
    cy.get('button').click()
    cy.getByData('dropdown').should('be.empty')
  })
})

describe('<Collapsible /> with navigation', () => {
  it('Works properly with the comments', () => {
    cy.mount(<Collapsible
      children={commentsContent}
      openActionName="Show Comments"
      closeActionName="Hide Comments"
      onAdditionalAction={()=>{}} 
      additionalActionRequired={true}
    />)

    cy.get('button').should('have.text', 'Show Comments')
    cy.getByData('dropdown').should('be.empty')
    cy.get('button').click()
    cy.getByData('dropdown').should('not.be.empty')
    cy.get('button').should('have.text', 'Hide Comments')
    cy.get('button').click()
    cy.getByData('dropdown').should('be.empty')
  })
})