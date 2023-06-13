//TODO All stages do correct things - loading, success, error
//TODO Testing loading message with errors

//TODO Test queries: semantic attributes to enforce accessibility and mindfulness

const errorMessage = 'Subreddit was not loaded due to a system error. Try reloading or contact the support.';

describe('User Flow Desktop', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Loading app and navigating around works as expected', () => {
      //Opens the site

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/science.json').as('loadDefaultSubreddit')
      cy.visit("http://localhost:3000")
  
      //Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')
  
  
      //Sees the correct feed ('Science' feed with some news)

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadDefaultSubreddit').its('response.statusCode').should('eq', 200)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

      //Clicks the link (Space)

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/space.json').as('loadSpaceSubreddit')
      cy.get('a[href="/space"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the 'Loading' message while loading
      // cy.getByData('content').contains(loadingMessage)

      //Sees the correct feed ('Space' feed with some news)

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadSpaceSubreddit').its('response.statusCode').should('eq', 200)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'space')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'space')
      //               })

      //Clicks the link (Sci-Fi)

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/scifi.json').as('loadScifiSubreddit')
      cy.get('a[href="/scifi"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the 'Loading' message while loading
      // cy.getByData('content').contains(loadingMessage)

      //Sees the correct feed ('Sci-Fi' feed with some news)

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadScifiSubreddit').its('response.statusCode').should('eq', 200)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'scifi')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'scifi')
      //               })

      //Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')


      //Sees the correct feed ('Science' feed with some news)
      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

    })

  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Ensures that adequate error messages are provided', () => {
      //Opens the site

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('initialRequest')
      cy.visit("http://localhost:3000")
      
      //Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')


      //Sees the correct error message

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@initialRequest')
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Space

      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/space.json', {statusCode: 404}).as('spaceRequest')
      cy.get('a[href="/space"]').click()

      //Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@spaceRequest')
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Sci-Fi
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/scifi.json', {statusCode: 404}).as('scifiRequest')
      cy.get('a[href="/scifi"]').click()

      //Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@scifiRequest')
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Science subreddit
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('scienceRequest')
      cy.get('a[href="/science"]').click()

      //Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@scienceRequest')
      cy.getByData('error').contains(errorMessage)
    })
  })
})

describe('User Flow Mobile', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr')
    })

    it('Ensures that loading app and changing subreddits works as expected', () => {
      //Opens the site
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/science.json').as('loadDefaultSubreddit')
      cy.visit("http://localhost:3000")
  
      //Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')
  
      //Sees the correct feed ('Science' feed with some news)
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadDefaultSubreddit').its('response.statusCode').should('eq', 200)
      
      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

      // Opens the dropdown
      cy.get('button').contains('Subreddits').click()
      
      //Clicks the link (Space)
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/space.json').as('loadSpaceSubreddit')
      cy.get('a[href="/space"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the correct feed ('Space' feed with some news)
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadSpaceSubreddit').its('response.statusCode').should('eq', 200)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'space')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'space')
      //               })

      //Clicks the link (Sci-Fi)
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('https://www.reddit.com/r/scifi.json').as('loadScifiSubreddit')
      cy.get('a[href="/scifi"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the correct feed ('Sci-Fi' feed with some news)
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@loadScifiSubreddit').its('response.statusCode').should('eq', 200)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'scifi')
      //               })

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'scifi')
      //               })

      //Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')


      //Sees the correct feed ('Science' feed with some news)

      //TODO: when the data is more prepared can be put back
      // cy.getByData('content').children()
      //               .should('have.length.greaterThan', 0)
      //               .each(($el) => {
      //                 expect($el).to.have.attr('data-subreddit', 'science')
      //               })

    })

  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr')
    })
    it('Ensures that adequate error messages are provided', () => {
      //Opens the site
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('initialRequest')
      cy.visit("http://localhost:3000")
      
      //Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@initialRequest')
      cy.getByData('error').contains(errorMessage)

      //Opens the dropdown
      cy.get('button').contains('Subreddits').click()

      //Navigates to the Space
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/space.json', {statusCode: 404}).as('spaceRequest')
      cy.get('a[href="/space"]').click()

      //Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@spaceRequest')
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Sci-Fi
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/scifi.json', {statusCode: 404}).as('scifiRequest')
      cy.get('a[href="/scifi"]').click()

      //Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@scifiRequest')
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Science subreddit
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('scienceRequest')
      cy.get('a[href="/science"]').click()

      //Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
      // LEGACY: was used for making requests to the Reddit json api.
      // cy.wait('@scienceRequest')
      cy.getByData('error').contains(errorMessage)
    })
  })
})
