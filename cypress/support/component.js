import './commands'

import { mount } from 'cypress/react18'
import { Provider } from 'react-redux'
import { store } from '../../src/app/store'

Cypress.Commands.add('mount', (component, options = {}) => {
  const { ...mountOptions } = options

  const wrapped = <Provider store={store}>{component}</Provider>

  return mount(wrapped, mountOptions)
})