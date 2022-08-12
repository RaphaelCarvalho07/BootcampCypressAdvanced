describe('Login', () => {
  it('deve logar com sucesso', () => {
    const user = {
      name: 'Raphael',
      instagram: '@raphilskerj',
      password: 'pwd123'
    }
    cy.login(user)
    cy.loggedUser('Raphael')
  })

  it('não deve logar com senha incorreta', () => {
    const user = {
      instagram: '@raphilskerj',
      password: '123456'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram inexistente', () => {
    const user = {
      instagram: '@raphilskerj',
      password: '123456'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })
})