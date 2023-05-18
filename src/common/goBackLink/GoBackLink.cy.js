import React from 'react'
import { store } from '../../app/store'
import { setSubreddit } from '../../features/feed/feedSlice';
import { GoBackLink } from './GoBackLink';

describe('<GoBackLink />', () => {
  it('Correct content for the Science subreddit', () => {
    store.dispatch(setSubreddit('science'))
    cy.mount(<GoBackLink />)
    cy.getByData('go-back-link').contains('Go back to Science')
  })

  it('Correct content for the Space subreddit', () => {
    store.dispatch(setSubreddit('space'))
    cy.mount(<GoBackLink />)
    cy.getByData('go-back-link').contains('Go back to Space')
  })

  it('Correct content for the Sci-Fi subreddit', () => {
    store.dispatch(setSubreddit('scifi'))
    cy.mount(<GoBackLink />)
    cy.getByData('go-back-link').contains('Go back to Sci-Fi')
  })
})