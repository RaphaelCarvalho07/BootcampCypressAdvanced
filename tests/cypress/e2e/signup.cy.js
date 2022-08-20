import signupPage from '../support/pages/Signup'

describe('Signup', () => {
    context('quando é um novo usuário', () => {
        it('deve cadastrar um novo usuário', () => {

            // Dado que eu tenha o koi targaryen
            const user = {
                name: 'Koi Targaryen',
                instagram: '@koi_targaryen',
                password: 'pwd123'
            }

            // e que este usuário não exista no banco
            cy.apiResetUser(user.instagram)
            // cy.deleteMany({ instagram: user.instagram }, {collection: 'users'}).then(res => {
            //     cy.log(res)
            // });

            // quando faço o cadastro do mesmo
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()

            // Então devo ver a mensagem de sucesso
            signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')
        })
    })

    context('quando o instagram já existe', () => {
        it('não deve cadastrar com instagram duplicado', () => {
            const user = {
                name: 'Sabrina Carvalho',
                instagram: '@sabrina_carvalho',
                password: 'pwd123'
            }
            cy.apiCreateUser(user)

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()

            signupPage.modal.haveText('Instagram já cadastrado!')
        })
    })
})