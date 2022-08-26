
import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {
    it('deve recomendar um food truck', () => {
        const user = {
            name: 'Odin',
            instagram: '@odin',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-22.98956780704664',
            longitude: '-43.43384742736817',
            name: 'Gamers Burguers',
            details: 'O melhor hamburguer temático da sua região',
            opening_hours: '14h às 00h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.goToFoodTruckForm()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')
        
        cy.wait(5000)
    })
})