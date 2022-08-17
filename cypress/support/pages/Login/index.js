import modal from '../components/Modal'
import {el} from './elements'

class LoginPage {
    constructor() {
        this.modal = modal
    } 

    go() {
        cy.visit('/')
    }
    form(user) {
        if (user.instagram) cy.get(el.instagram).type(user.instagram)
        if (user.password) cy.get(el.password).type(user.password)        
    }
    submit() {
        cy.contains(el.btnSubmit).click()
    }
}
    
export default new LoginPage()