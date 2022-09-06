

describe('Avaliações', () => {

    it('deve enviar uma nova avaliação', () => {

        const user = {
            name: 'Madruga Ramon',
            instagram: '@madruguinha',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '22.98943940977146',
            longitude: '-43.43115448951722',
            name: 'Cachorro quente do Magrinho',
            details: 'O maior hotdog da região',
            opening_hours: 'das 14h às 20h',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        cy.wait(3000)
    })
})