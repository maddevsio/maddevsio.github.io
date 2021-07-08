import { render, fireEvent, screen } from '@testing-library/vue'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import TeamsForm from '@/components/core/forms/TeamsForm'
import formBaseProps from '../../../__mocks__/formBaseProps'

import delay from '../../../../client/helpers/delay'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = {
  actions: {
    sendLead: jest.fn(),
    getIPInfo: () => ({}),
  },
}
const mocks = formBaseProps

describe('TeamsForm component', () => {
  it('should render correctly', () => {
    const { container } = render(TeamsForm, {
      mocks,
      store,
    })

    expect(container).toMatchSnapshot()
  })

  it('should correct call handler', async () => {
    render(TeamsForm, {
      mocks,
      store,
    })

    await fireEvent.update(screen.getByTestId('test-base-form-phoneNumber'), '+3 4546-657-9098-7875645342245')
    await fireEvent.update(screen.getByTestId('test-base-form-email'), 'someemail@maddevs.io')
    await fireEvent.update(screen.getByTestId('test-base-form-fullName'), 'John Johnson')

    await fireEvent.click(screen.queryByTestId('test-privacy-policy-checkbox-input'))
    await fireEvent.click(screen.getByText(/Get a team of ultra fast coders/))

    await delay(1000)
    expect(mocks.$v.$reset).toHaveBeenCalledTimes(1)
  })
})
