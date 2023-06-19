import React from 'react'
import { Footer } from './Footer'

const links = {
  githubProject: 'https://github.com/zverolen/reddit-client',
  github: 'https://github.com/zverolen',
  linkedin: 'https://www.linkedin.com/in/lena-zvereva-722b3177/',
  instagram: 'https://www.instagram.com/ele.zvereva.photo/',
  facebook: 'https://www.facebook.com/zverolen.art/',
  email: 'mailto:zverolen@gmail.com'
}

describe('<Footer />', () => {
  it('renders', () => {
    cy.mount(<Footer />)
    cy.get('footer').should('exist')
    cy.get('footer').find('p:first-child').should('have.text', 'This is a learning project. Check out the repo.')
    cy.get('footer').find('p:last-child').should('have.text', 'Find me on Github, LinkedIn, Instagram or Facebook. Or, email me!')
    cy.getByData('link-project').should('have.attr', 'href', links.githubProject).and('have.text', 'repo')
    cy.getByData('link-github').should('have.attr', 'href', links.github).and('have.text', 'Github')
    cy.getByData('link-linkedin').should('have.attr', 'href', links.linkedin).and('have.text', 'LinkedIn')
    cy.getByData('link-instagram').should('have.attr', 'href', links.instagram).and('have.text', 'Instagram')
    cy.getByData('link-email').should('have.attr', 'href', links.email).and('have.text', 'email me')
  })
})