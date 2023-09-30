import BuyMeCoffe from './BuyMeCoffe'

it('mounts', () => {
  cy.mount(<BuyMeCoffe />)
  cy.contains('BuyMeCoffe')
})
