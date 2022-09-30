describe('Blog app', async function () {
  //1: Configure Cypress to your project. Make a test for checking that the application displays the login form by default.
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  //2: Make tests for logging in. Test both successful and unsuccessful login attempts. Make a new user in the beforeEach block for the tests.
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
    })
  })

  //3: Make a test which checks that a logged-in user can create a new blog. The structure of the test could be as follows:
  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('A fake blog')
      cy.get('#author').type('Fictional Author')
      cy.get('#url').type('www.example.com')
      cy.get('#likes').type(1000)
      cy.contains('Create').click()
      cy.contains('A new blog was added')
      cy.contains('A fake blog')
    })
  })

  //4: Make a test which checks that users can like a blog.

  //5: Make a test for ensuring that the user who created a blog can delete it.

  //6: Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.
})