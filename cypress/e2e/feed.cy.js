// All stages do correct things - loading, success, error
// Testing loading message with errors
// ???? Order of feed and the subreddits list
// ???? The fact that the already loaded feed is in cache and doesn't need a new request

// Test queries: semantic attributes to enforce accessibility and mindfulness

const loadingMessage = /^loading$/;
const errorMessage = 'Subreddit was not loaded due to a system error. Try reloading or contact the support.';

describe('User Flow Desktop', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Ensures that loading app and changing subreddits works as expected', () => {
      // 1. Opens the site
      cy.intercept('https://www.reddit.com/r/science.json').as('loadDefaultSubreddit')
      cy.visit("http://localhost:3000")
  
      //  2. Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')
  
      //  3. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)
  
      //  4. Sees the correct feed ('Science' feed with some news)
      cy.wait('@loadDefaultSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'science')
                    })

      //   5. Clicks the link (Space)
      cy.intercept('https://www.reddit.com/r/space.json').as('loadSpaceSubreddit')
      cy.get('a[href="/space"]').click()

      //   6. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //   7. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      //   8. Sees the correct feed ('Space' feed with some news)
      cy.wait('@loadSpaceSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'space')
                    })

      //   9. Clicks the link (Sci-Fi)
      cy.intercept('https://www.reddit.com/r/scifi.json').as('loadScifiSubreddit')
      cy.get('a[href="/scifi"]').click()

      //   10. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //   11. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      //   12. Sees the correct feed ('Sci-Fi' feed with some news)
      cy.wait('@loadScifiSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'scifi')
                    })

      //   13. Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //   14b. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')


      //   15. Sees the correct feed ('Science' feed with some news)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'science')
                    })

    })
  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Ensures that adequate error messages are provided', () => {
      // 1. Opens the site
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('initialRequest')
      cy.visit("http://localhost:3000")
      
      // 2. Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')

      // 3. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      // 4. Sees the correct error message
      cy.wait('@initialRequest')
      cy.getByData('error').contains(errorMessage)

      // 5. Navigates to the Space
      cy.intercept('GET', 'https://www.reddit.com/r/space.json', {statusCode: 404}).as('spaceRequest')
      cy.get('a[href="/space"]').click()

      // 6. Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      // 7. Sees the correct error message
      cy.wait('@spaceRequest')
      cy.getByData('error').contains(errorMessage)

      // 8. Navigates to the Sci-Fi
      cy.intercept('GET', 'https://www.reddit.com/r/scifi.json', {statusCode: 404}).as('scifiRequest')
      cy.get('a[href="/scifi"]').click()

      // 9. Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      // 4. Sees the correct error message
      cy.wait('@scifiRequest')
      cy.getByData('error').contains(errorMessage)

      // Navigates to the Science subreddit
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('scienceRequest')
      cy.get('a[href="/science"]').click()

      //   a. Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      // 4. Sees the correct error message
      cy.wait('@scienceRequest')
      cy.getByData('error').contains(errorMessage)
    })
  })
})

describe('User Flow Mobile', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr')
    })

    it.only('Ensures that loading app and changing subreddits works as expected', () => {
      // 1. Opens the site
      cy.intercept('https://www.reddit.com/r/science.json').as('loadDefaultSubreddit')
      cy.visit("http://localhost:3000")
  
      //  2. Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')
  
      //  3. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)
  
      //  4. Sees the correct feed ('Science' feed with some news)
      cy.wait('@loadDefaultSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'science')
                    })

      // Opens the dropdown
      cy.get('button').contains('Subreddits').click()
      
      //   5. Clicks the link (Space)
      cy.intercept('https://www.reddit.com/r/space.json').as('loadSpaceSubreddit')
      cy.get('a[href="/space"]').click()

      //   6. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //   7. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      //   8. Sees the correct feed ('Space' feed with some news)
      cy.wait('@loadSpaceSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'space')
                    })

      //   9. Clicks the link (Sci-Fi)
      cy.intercept('https://www.reddit.com/r/scifi.json').as('loadScifiSubreddit')
      cy.get('a[href="/scifi"]').click()

      //   10. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //   11. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      //   12. Sees the correct feed ('Sci-Fi' feed with some news)
      cy.wait('@loadScifiSubreddit').its('response.statusCode').should('eq', 200)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'scifi')
                    })

      //   13. Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //   14b. Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')


      //   15. Sees the correct feed ('Science' feed with some news)
      cy.getByData('content').children()
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                      expect($el).to.have.attr('data-subreddit', 'science')
                    })

    })

  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr')
    })
    it('Ensures that adequate error messages are provided', () => {
      // 1. Opens the site
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('initialRequest')
      cy.visit("http://localhost:3000")
      
      // 2. Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')

      // 3. Sees the 'Loading' message while loading
      cy.getByData('content').contains(loadingMessage)

      // 4. Sees the correct error message
      cy.wait('@initialRequest')
      cy.getByData('error').contains(errorMessage)

      // Opens the dropdown
      cy.get('button').contains('Subreddits').click()

      // 5. Navigates to the Space
      cy.intercept('GET', 'https://www.reddit.com/r/space.json', {statusCode: 404}).as('spaceRequest')
      cy.get('a[href="/space"]').click()

      // 6. Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      // 7. Sees the correct error message
      cy.wait('@spaceRequest')
      cy.getByData('error').contains(errorMessage)

      // 8. Navigates to the Sci-Fi
      cy.intercept('GET', 'https://www.reddit.com/r/scifi.json', {statusCode: 404}).as('scifiRequest')
      cy.get('a[href="/scifi"]').click()

      // 9. Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      // 4. Sees the correct error message
      cy.wait('@scifiRequest')
      cy.getByData('error').contains(errorMessage)

      // Navigates to the Science subreddit
      cy.intercept('GET', 'https://www.reddit.com/r/science.json', {statusCode: 404}).as('scienceRequest')
      cy.get('a[href="/science"]').click()

      //   a. Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      // 4. Sees the correct error message
      cy.wait('@scienceRequest')
      cy.getByData('error').contains(errorMessage)
    })
  })
})
