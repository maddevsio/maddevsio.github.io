import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import footerForm from '@/components/Footer/footer-form';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue();

localVue.use(Vuelidate);

describe('Footer form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(footerForm, {
      localVue,
      stubs: ['modal'],
      mocks: {
        $store: {
          dispatch: () => new Promise((rs, rj) => rs())
        }
      }
    });
    wrapper.vm.$refs = { 
      checkboxes: {
        reset: jest.fn()
      },
      form: {
        reset: jest.fn()
      }
    };
  });

  // ------ IMPORTANT ----- //
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  // --------------------- //

  test('sets the correct default data', () => {
    expect(typeof footerForm.data).toBe('function');
    const defaultData = footerForm.data();
    expect(
      defaultData.agreeWithPrivacyPolicy &&
      defaultData.agreeToGetMadDevsDiscountOffers
    ).toEqual(false);
  });

  test('has a functions', () => {
    expect(
      typeof footerForm.methods.submitForm && 
      typeof footerForm.methods.resetForm
    ).toBe('function');
  });

  test('should rest values in data instances', () => {
    // Set mock data for data instances
    wrapper.vm.$data.fullname = 'Name';
    wrapper.vm.$data.email = 'email@mail.com';
    wrapper.vm.$data.description = 'Project Describer';
    wrapper.vm.$data.form = {
      value1: 'value1',
      value2: 'value2'
    };
    wrapper.vm.$data.agreeWithPrivacyPolicy = true;
    wrapper.vm.$data.agreeToGetMadDevsDiscountOffers = true;
    wrapper.vm.$data.isEmailSent = true;

    wrapper.vm.resetForm();
    expect(
      wrapper.vm.$data.fullname &&
      wrapper.vm.$data.email &&
      wrapper.vm.$data.form
    ).toEqual(null);
    expect(wrapper.vm.$data.description).toEqual('');
    expect(
      wrapper.vm.$data.agreeWithPrivacyPolicy &&
      wrapper.vm.$data.agreeToGetMadDevsDiscountOffers &&
      wrapper.vm.$data.isEmailSent
    ).toEqual(false);
  });
});
