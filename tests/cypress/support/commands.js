// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from './pages/Login'
import mapPage from './pages/Map'

Cypress.Commands.add('apiLogin', (user) => {
    const payload = {
        instagram: user.instagram,
        password: user.password
}

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(res => {
        expect(res.status).to.eq(200)
        Cypress.env('token', res.body.token)
    })
})

Cypress.Commands.add('apiResetUser', (instagram) => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3333/helpers-reset',
        qs: { instagram: instagram },
        failOnStatusCode: false
    }).then(res => {
        expect(res.status).to.eq(204)
    })
})

Cypress.Commands.add('apiCreateFoodTruck', (payload) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/foodtrucks',
        headers: {
            authorization: Cypress.env('token')
        },
        body: payload,
        failOnStatusCode: false
    }).then(res => {
        expect(res.status).to.eq(201)
    })
})

Cypress.Commands.add('apiCreateUser', (payload) => {
    cy.apiResetUser(payload.instagram)

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/signup',
        body: payload
    }).then(res => {
        expect(res.status).to.eq(201)
    })
})

Cypress.Commands.add('uiLogin', (user) => {

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)
})

Cypress.Commands.add('setGeolocation', (lat, long) => {
    localStorage.setItem('qtruck:latitude', lat)
    localStorage.setItem('qtruck:longitude', long)
})