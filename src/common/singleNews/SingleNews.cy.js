import React from 'react'
import { SingleNews } from './SingleNews'
import { data } from '../../data/testingDataSubreddit'

const news = data.data.children[1].data;

describe('<SingleNews />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SingleNews news={news}/>)
    cy.get('h2').contains('Wearing hearing aids could help cut the risk of dementia, according to a large decade-long study. The research accounted for other factors, including loneliness, social isolation and depression, but found that untreated hearing loss still had a strong association with dementia')
    cy.getByData('author').contains('Wagamaga')
  })
})