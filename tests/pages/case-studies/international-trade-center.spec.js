import { render } from '@testing-library/vue'
import InternationalTradeCenter from '@/pages/case-studies/international-trade-center'

const mocks = {
  $getMediaFromS3: () => 'img.jpg',
  $lazyLoad: {
    init: jest.fn(),
  },
}

const stubs = ['NuxtLink', 'Main']

describe('InternationalTradeCenter root component', () => {
  it('should render correctly', () => {
    const { container } = render(InternationalTradeCenter, {
      mocks,
      stubs,
    })

    expect(container).toMatchSnapshot()
  })
})