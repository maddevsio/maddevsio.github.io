import Swiper from '@/components/Cases/Swiper'
import { render } from '@testing-library/vue'

const props = {
  components: [
    {
      fileName: 'admin',
      pictureFolder: 'nambafood',
      fileExtension: 'jpg',
    },
    {
      fileName: 'dashboard',
      pictureFolder: 'nambafood',
      fileExtension: 'jpg',
    },
  ],
}

describe('Swiper component', () => {
  it('Picture component', () => {
    const { container } = render(Swiper, {
      props,
    })
    expect(container).toMatchSnapshot()
  })
})
