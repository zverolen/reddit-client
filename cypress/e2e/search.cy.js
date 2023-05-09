
describe('Perform Search', () => {
  it('User searches and finds the articles with the search term', () => {
    // Page loads
    cy.fixture('subreddit').then((json) => {
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    })
    cy.visit("http://localhost:3000")
    cy.wait('@getSubreddit')
    //User performs search
    cy.get('label').contains('Search headlines:')
    cy.get('input').should('have.attr', 'placeholder', 'Search term...')
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('input').focus()
    cy.get('input').should('be.focused')
    cy.get('input').type('JUICE')
    cy.get('button[type="submit"]').should('not.be.disabled')
    cy.get('button[type="submit"]').focus()
    cy.get('button[type="submit"]').should('be.focused')
    cy.get('button[type="submit"]').click()
    //User sees results
    cy.getByData('feed-heading').contains('Search results for the term "JUICE":')
    cy.getByData('content').children().should('have.length', 2)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
    cy.get('input').should('not.have.value', 'JUICE')
    cy.get('button[type="submit"]').should('be.disabled')
    //User navigates back to the default feed
    cy.fixture('subreddit').then((json) => {
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getNewSubreddit')
    })
    cy.get('a[href="/science"]').click()
    cy.getByData('feed-heading').contains('Science')
  })

  it(`Doesn't work if the input is empty`, () => {
    cy.visit("http://localhost:3000")
    // Force click in case disabled is not set
    cy.get('button[type="submit"]').click({force: true})
    cy.getByData('feed-heading').contains('Science')
  })

  it('Shows correct message if no items were found and performs new search', () => {
    cy.fixture('subreddit').then((json) => {
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    })
    cy.visit("http://localhost:3000")
    cy.wait('@getSubreddit')
    cy.get('input').focus()
    cy.get('input').type('фваващдоыва')
    cy.get('button[type="submit"]').click()
    cy.getByData('feed-heading').contains('No results for your phrase "фваващдоыва".')
    cy.getByData('error').contains('Try another phrase or contact the support')
    cy.get('input').focus()
    cy.get('input').type('JUICE')
    cy.get('button[type="submit"]').click()
    cy.getByData('feed-heading').contains('Search results for the term "JUICE":')
    cy.getByData('content').children().should('have.length', 2)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
  })

})