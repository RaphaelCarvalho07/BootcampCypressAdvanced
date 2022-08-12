describe('login', () => {

  context('com credenciais válidas', () => {
    it('deve logar com sucesso', () => {
      const user = {
        name: 'Raphael',
        instagram: '@raphilskerj',
        password: 'pwd123'
      }
      cy.login(user)
      cy.loggedUser('Raphael')
    })
  })

  context('com senha incorreta', () => {
    it('deve notificar falha de credenciais', () => {
      const user = {
        instagram: '@raphilskerj',
        password: '123456'
      }
      cy.login(user)
      cy.modalHaveText('Credenciais inválidas, tente novamente!')
    })
  })

  context('com instagram inexistente', () => {
    it('não deve logar com instagram inexistente', () => {
      const user = {
        instagram: '@raphilskerj',
        password: '123456'
      }
      cy.login(user)
      cy.modalHaveText('Credenciais inválidas, tente novamente!')
    })
  })


  context('sem informar código do instagram', () => {
    it('deve informar que código do instagram é obrigatório', () => {
      const user = {
        password: "pwd123"
      }

      cy.visit('/')


      cy.get('input[name=password]').type(user.password)

      cy.contains('button', 'Entrar').click()

      cy.modalHaveText('Por favor, informe o seu código do Instagram!')
    })
  })

  context('sem informar senha', () => {
    it('deve informar que a senha é obrigatória', () => {
      const user = {
        instagram: "@raphilskerj"
      }

      cy.visit('/')

      cy.get('input[name=instagram]').type(user.instagram)

      cy.contains('button', 'Entrar').click()

      cy.modalHaveText('Por favor, informe a sua senha secreta!')
    })
  })

  context('sem informar nenhum dos campos', () => {
    it('deve solicitar para informar as credenciais', () => {

      cy.visit('/')
      
      cy.contains('button', 'Entrar').click()

      cy.modalHaveText('Por favor, informe suas credenciais!')
    })
  })
})