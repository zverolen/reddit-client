import React from 'react'
import { FeedItem } from './FeedItem'
import { data } from '../../data/testingDataSubreddit'

// TODO: check that markdown is formatted correctly

describe('Render FeedItem component (one news) with different content', () => {
  it('Renders a news with the text content', () => {
    cy.mount(<FeedItem data={data.data.children[0].data}/>)

    cy.get('p[data-test="author"]').contains('shiruken')
    cy.get('h3').contains('RETRACTION: The role of social circle COVID-19 illness and vaccination experiences in COVID-19 vaccination decisions: an online survey of the United States population')
    cy.get('div[data-subreddit="science"]').find('div').contains('We wish to inform the r/science community of an article submitted to the subreddit that has since been retracted by the journal. While it did not gain much attention on r/science, it saw significant exposure elsewhere on Reddit and across other social media platforms.')
  })

  it('Renders a news no content (only heading)', () => {
    cy.mount(<FeedItem data={data.data.children[1].data}/>)

    cy.get('p[data-test="author"]').contains('Wagamaga')
    cy.get('h3').contains('Wearing hearing aids could help cut the risk of dementia, according to a large decade-long study. The research accounted for other factors, including loneliness, social isolation and depression, but found that untreated hearing loss still had a strong association with dementia')
    cy.get('div[data-subreddit="science"]').find('div').should('not.exist')
  })

  it('Renders a news with a video', () => {
    cy.mount(<FeedItem data={data.data.children[2].data}/>)

    cy.get('p[data-test="author"]').contains('BellyFlopMan06')
    cy.get('h3').contains('JUICE Launch')
    cy.get('video').should('have.attr', 'controls')
    cy.get('video').should('have.attr', 'src', 'https://v.redd.it/mwxutbxafuta1/DASH_720.mp4?source=fallback')
  })

  it('Renders a news with a link', () => {
    cy.mount(<FeedItem data={data.data.children[3].data}/>)

    cy.get('p[data-test="author"]').contains('andrewgarrison')
    cy.get('h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
    cy.get('a').contains('Rich Video https://www.youtube.com/watch?v=TP42UZ8uRss')
  })

  it('Renders a news with an image', () => {
    cy.mount(<FeedItem data={data.data.children[4].data}/>)

    cy.get('p[data-test="author"]').contains('stygium')
    cy.get('h3').contains('Found this gem. Anyone read this? Is it good?')
    cy.get('img').should('have.attr', 'alt')
    cy.get('img').should('have.attr', 'src', 'https://i.redd.it/pz0j5j7u3qta1.jpg')
  })
})