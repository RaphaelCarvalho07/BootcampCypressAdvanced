import modal from '../components/Modal'
import { el } from './elements'

class LoginPage {
    constructor() {
        this.modal = modal
    }

    go(lat = '-22.98981', long = '-43.43618') {
        cy.visit('/', this.mockLocation(lat, long))
    }
    form(user) {
        if (user.instagram) cy.get(el.instagram).type(user.instagram)
        if (user.password) cy.get(el.password).type(user.password)
    }
    submit() {
        cy.contains(el.btnSubmit).click()
    }

    goToSignup() {
        cy.contains('a', 'Cadastrar').click()
    }

    mockLocation(latitude, longitude) {
        return {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
                    if (latitude && longitude) {
                        return cb({ coords: { latitude, longitude } })
                    }
                    throw err({ code: 1 })
                });
            }
        }
    }
}

export default new LoginPage()