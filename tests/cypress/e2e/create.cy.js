
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
    })

    it('não deve cadastrar foodtruck com o nome duplicado', () => {
        const user = {
            name: 'Loki',
            instagram: '@loki',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-22.98956780704884',
            longitude: '-43.43384742736917',
            name: 'Forneria Original',
            details: 'A melhor pizzaria da sua região',
            opening_hours: '15h às 19h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodTruckForm()
        createPage.form(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Esse food truck já foi cadastrado!')
    })

    it.only('todos os campos são obrigatórios', () => {
        const user = {
            name: 'Milady',
            instagram: '@milady',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-22.98956780704664',
            longitude: '-43.43384742736817',
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.goToFoodTruckForm()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
        createPage.submit()
        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
        createPage.modal.haveText(message)
    })
})