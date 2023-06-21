
describe('Perform Search', () => {
  it('User searches and finds the articles with the search term', () => {
    // Page loads

    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    // })
    cy.visit("http://localhost:3000")

    // LEGACY: was used for making requests to the Reddit json api.
    // cy.wait('@getSubreddit')

    //User performs search
    cy.get('label').contains('Search headlines (case-sensitive):')
    cy.getByData('search-button').should('be.disabled')
    cy.get('input').focus()
    cy.get('input').should('be.focused')
    cy.get('input').type('JUICE')
    cy.getByData('search-button').should('not.be.disabled')
    cy.getByData('search-button').focus()
    cy.getByData('search-button').should('be.focused')
    cy.getByData('search-button').click()

    //User sees results
    cy.getByData('feed-heading').contains('Search results for the term "JUICE":')
    cy.getByData('content').children().should('have.length', 2)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
    cy.get('input').should('not.have.value', 'JUICE')
    cy.getByData('search-button').should('be.disabled')

    //User navigates back to the default feed via subreddits nav

    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getNewSubreddit')
    // })
    cy.get('a[href="/science"]').click()
    cy.getByData('feed-heading').contains('Science')
  })

  it('User searches the news and goes back to the full subreddit', () => {
    //User opens the app
    cy.visit("http://localhost:3000")

    //User performs the search
    cy.get('input').type('the')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Science')

    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'science')
    //                 })

    //User performs the search with a "wrong" search term
    cy.get('input').type('фваващдоыва')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Science')

    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'science')
    //                 })

    //User goes to the second subreddit
    cy.get('a[href="/space"]').click()

    //User performs the search
    cy.get('input').type('the')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Space')

    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'space')
    //                 })
    
    //User performs the search with a "wrong" search term
    cy.get('input').type('фваващдоыва')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Space')
    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'space')
    //                 })

    //User goes to the third subreddit
    cy.get('a[href="/scifi"]').click()

    //User performs the search
    cy.get('input').type('the')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Sci-Fi')
    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'scifi')
    //                 })

    //User performs the search with a "wrong" search term
    cy.get('input').type('фваващдоыва')
    cy.getByData('search-button').click()

    //User navigates back to the full subreddit regardless the search results
    cy.getByData('go-back-link').click()
    cy.get('h2').contains('Sci-Fi')
    //TODO: when the data is more prepared can be put back
    // cy.getByData('content').children()
    //                 .should('have.length.greaterThan', 0)
    //                 .each(($el) => {
    //                   expect($el).to.have.attr('data-subreddit', 'scifi')
    //                 })

  })

  it(`Doesn't work if the input is empty`, () => {
    cy.visit("http://localhost:3000")
    // Force click in case disabled is not set
    cy.getByData('search-button').click({force: true})
    cy.getByData('feed-heading').contains('Science')
  })

  it('Shows correct message if no items were found and performs new search', () => {
    //User opens the app
    
    // LEGACY: was used for making requests to the Reddit json api.
    // cy.fixture('subreddit').then((json) => {
    //   cy.intercept('GET', 'https://www.reddit.com/r/science.json', {body: json}).as('getSubreddit')
    // })
    cy.visit("http://localhost:3000")

    // LEGACY: was used for making requests to the Reddit json api.
    // cy.wait('@getSubreddit')

    //Performs the search
    cy.get('input').focus()
    cy.get('input').type('фваващдоыва')
    cy.getByData('search-button').click()

    //Sees error message with actions available via interactive elements
    cy.getByData('feed-heading').contains('No results for your phrase "фваващдоыва".')
    cy.getByData('error').contains('Try another phrase or contact the support')
    cy.getByData('support-link').should('have.attr', 'href').and('match', /mailto:/)
    cy.get('input').focus()
    cy.get('input').type('JUICE')
    cy.getByData('search-button').click()
    cy.getByData('feed-heading').contains('Search results for the term "JUICE":')
    cy.getByData('content').children().should('have.length', 2)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
  })

  it('Performs case-insensitive search correctly', () => {
    cy.visit("http://localhost:3000")
  
    cy.get('input').type('juice')
    cy.getByData('search-button').click()

    cy.getByData('feed-heading').contains('Search results for the term "juice":')
    cy.getByData('content').children().should('have.length', 2)
    cy.getByData('content').find('> div:first-child h3').contains('JUICE Launch')
    cy.getByData('content').find('> div:nth-child(2) h3').contains('ESA is launching JUICE very soon! We had the great honor to team up with ESA to add the JUICE spacecraft to our space sim so players can get hands on with this amazing spacecraft and learn more about the mission.')
  })

})