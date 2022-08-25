
import mapPage from '../support/pages/Map'

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
            description: 'O melhor hamburguer temático da sua região',
            opening_hours: '14h às 00h'
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.goToFoodTruckForm()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)

        cy.wait(30000)
    })
})