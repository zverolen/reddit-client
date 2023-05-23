import React from 'react'
import { CommentsItem } from './CommentsItem'
import { comments } from '../../data/testingDataComments';

// TODO: check that markdown is formatted correctly
// TODO: change existence check into actual content check

describe('<CommentsItem />', () => {
  it('All elements render correctly', () => {
    console.log(comments[0].data);
    cy.mount(<CommentsItem data={comments[0].data} />)
    cy.getByData('comments-author').contains('AutoModerator')
    cy.getByData('comments-created').should('exist')
    cy.getByData('comments-text').should('exist')
  })
})