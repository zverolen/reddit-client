//Test queries: semantic attributes to enforce accessibility and mindfulness

const errorMessage = 'Subreddit was not loaded due to a system error. Try reloading or contact the support.';

describe('User Flow Desktop', () => {
  context('Happy Path', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Loading app and navigating around works as expected', () => {
      //Opens the site

      cy.visit("http://localhost:3000")
  
      //Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')

      // Sees the footer if scrolls down
      cy.get('footer').should('exist')
      cy.get('footer').find('p:first-child').should('have.text', 'This is a learning project. Check out the repo.')
      cy.get('footer').find('p:last-child').should('have.text', 'Find me on Github, LinkedIn, Instagram or Facebook. Or, email me!')

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
      
       // Sees the footer if scrolls down
       cy.get('footer').should('exist')
       cy.get('footer').find('p:first-child').should('have.text', 'This is a learning project. Check out the repo.')
       cy.get('footer').find('p:last-child').should('have.text', 'Find me on Github, LinkedIn, Instagram or Facebook. Or, email me!')
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Clicks the link (Space)
      cy.get('a[href="/space"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the 'Loading' message while loading
      // cy.getByData('content').contains(loadingMessage)

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Clicks the link (Sci-Fi)
      cy.get('a[href="/scifi"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the 'Loading' message while loading
      // cy.getByData('content').contains(loadingMessage)

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')

    })

  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
    })

    it('Ensures that adequate error messages are provided', () => {
      //Opens the site

      cy.visit("http://localhost:3000")
      
      //Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')


      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Space
      cy.get('a[href="/space"]').click()

      //Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Sci-Fi
      cy.get('a[href="/scifi"]').click()

      //Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Science subreddit
      cy.get('a[href="/science"]').click()

      //Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
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
      cy.visit("http://localhost:3000")
  
      //Sees the Heading of the default subreddit (Science)
      cy.getByData('feed').find('h2').contains('Science')
  
      // Sees the footer if scrolls down
      cy.get('footer').should('exist')
      cy.get('footer').find('p:first-child').should('have.text', 'This is a learning project. Check out the repo.')
      cy.get('footer').find('p:last-child').should('have.text', 'Find me on Github, LinkedIn, Instagram or Facebook. Or, email me!')

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)

       // Sees the footer if scrolls down
       cy.get('footer').should('exist')
       cy.get('footer').find('p:first-child').should('have.text', 'This is a learning project. Check out the repo.')
       cy.get('footer').find('p:last-child').should('have.text', 'Find me on Github, LinkedIn, Instagram or Facebook. Or, email me!')
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Science')

      // Opens the dropdown
      cy.get('button').contains('Subreddits').click()
      
      //Clicks the link (Space)
      cy.get('a[href="/space"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Space')

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Clicks the link (Sci-Fi)
      cy.get('a[href="/scifi"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Opens a single news
      cy.getByData('content').find(' > div:first-child [data-test="open-single-news"]').click()

      //Sees one news
      cy.getByData('content').children()
                    .should('have.length',  1)
                    
      //Goes back from Single News view to Subreddit view
      cy.getByData('go-back-link').click()

      //Sees the full subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Clicks the link (Science)
      cy.get('a[href="/science"]').click()

      //Sees the new Heading
      cy.getByData('feed').find('h2').contains('Science')

    })

  })

  context('Behavior with errors', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr')
    })
    it('Ensures that adequate error messages are provided', () => {
      //Opens the site
      cy.visit("http://localhost:3000")
      
      //Sees the Heading of the default subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Opens the dropdown
      cy.get('button').contains('Subreddits').click()

      //Navigates to the Space
      cy.get('a[href="/space"]').click()

      //Sees the Heading of Space subreddit
      cy.getByData('feed').find('h2').contains('Space')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Sci-Fi
      cy.get('a[href="/scifi"]').click()

      //Sees the Heading of the Sci-Fi subreddit
      cy.getByData('feed').find('h2').contains('Sci-Fi')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)

      //Navigates to the Science subreddit
      cy.get('a[href="/science"]').click()

      //Sees the Heading of the Science subreddit
      cy.getByData('feed').find('h2').contains('Science')

      //Sees the correct error message
      cy.getByData('error').contains(errorMessage)
    })
  })
})
