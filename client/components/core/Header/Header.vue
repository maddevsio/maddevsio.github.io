<template>
  <div id="header" class="header-wrapper">
    <div id="overlay" ref="overlay"></div>
    <header ref="header" :class="{ transparent: isCasePage && !isActiveMobileMenu }" class="header">
      <div ref="headerContainer" class="container">
        <div class="row">
          <div class="header__left-nav_bar col-xl-6 col-lg-7">
            <RouterLink :to="`/`" class="header__logo-icon">
              <HeaderLogo
                :is-show-text="showLogoText"
                :is-case-page="isCasePage"
                :is-active-mobile-menu="isActiveMobileMenu"
                class="header__header-logo"
              />
            </RouterLink>
            <nav class="header__header-routes_links">
              <RouterLink
                v-for="{ title, link, exact } in navigation"
                :key="link"
                :exact="exact"
                class="header__navigation-link"
                :to="link"
                @click.native="goToTopPage"
              >
                {{ title }}
              </RouterLink>
            </nav>
            <!-- Burget btn -->
            <div class="header__burger" @click="toggleMobileMenu">
              <svg
                v-if="isActiveMobileMenu"
                class="header__burger--close"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.807613 19.1924L19.1924 0.807623M19.1914 19.1924L0.806641 0.807617"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else
                class="header__burger--open"
                width="30"
                height="10"
                viewBox="0 0 30 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H30V1H0V0Z" fill="#F5F7F9" />
                <path d="M0 9H30V10H0V9Z" fill="#F5F7F9" />
              </svg>
            </div>
            <!-- END Burget btn -->
          </div>
          <div class="header__right-content col-xl-6 col-lg-5">
            <div class="header__phone-wrapper">
              <!-- Flag uk -->
              <img
                width="19"
                height="14"
                src="@/assets/img/Home/flags/uk.svg"
                class="header__phone-flag"
                alt="United Kingdom"
              />
              <a class="header__header-phone" href="tel:+442039848555">+44 20 3984 8555</a>
            </div>
            <UIModalTriggerButton label="Contact me" color="red" @click="$refs.contactMeModal.show()" />
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile header -->
    <HeaderMobile
      v-if="isActiveMobileMenu"
      @changed-page="isActiveMobileMenu = false"
      @open-modal="$refs.contactMeModal.show()"
    />
    <!-- END Mobile header -->

    <Modal ref="contactMeModal">
      <ContactMeModal @success="$refs.contactMeModal.close()" />
    </Modal>
  </div>
</template>

<script>
import UIModalTriggerButton from '@/components/shared/UIModalTriggerButton'
import HeaderMobile from '@/components/core/Header/HeaderMobile'
import HeaderLogo from '@/components/core/Header/HeaderLogo'
import Modal from '@/components/core/Modal'
import { headerNavigation as navigation } from '@/data/navigation'

export default {
  name: 'MainHeader',
  components: {
    UIModalTriggerButton,
    ContactMeModal: () => import('@/components/core/modals/ContactMe'),
    HeaderMobile,
    HeaderLogo,
    Modal,
  },

  data() {
    return {
      navigation,
      showLogoText: true,
      isActiveMobileMenu: false,
      isCasePage: false,
      caseHeader: null,
      headerWhiteLogoText: null,
      caseFirstSection: null,
      caseGoDeeScrollContainer: null,
    }
  },

  watch: {
    $route() {
      this.setDefaultStateForHeader()
      this.removeEventListeners()
    },
  },

  created() {
    this.setDefaultStateForHeader()
  },

  mounted() {
    this.getDOMSelectors()
    this.addEventListeners()
    if (this.isCasePage && this.$nuxt.$route.path.includes('/godee')) {
      this.setWidthForHeader()
    }
  },

  methods: {
    // Base methods
    goToTopPage() {
      window.scrollTo(0, 0)
    },

    enableScrollOnBody() {
      document.body.classList.remove('scrollDisabled')
      document.documentElement.classList.remove('scrollDisabled')
    },

    disableScrollOnBody() {
      document.body.classList.add('scrollDisabled')
      document.documentElement.classList.add('scrollDisabled')
    },

    setDefaultStateForHeader() {
      this.isCasePage = this.$nuxt.$route.path.includes('/case-studies/')
    },

    changeLogoState(scrollTop) {
      this.showLogoText = !(scrollTop >= 10)
    },

    handleMobileMenuScroll() {
      this.changeLogoState(this.mobileHeaderScrollbar.scrollTop)
    },

    toggleMobileMenu() {
      this.isActiveMobileMenu = !this.isActiveMobileMenu
      if (this.isActiveMobileMenu) {
        this.disableScrollOnBody()
        this.$nextTick(() => {
          this.mobileHeaderScrollbar = document.getElementById('mobile-header-scrollbar')
          this.mobileHeaderScrollbar.addEventListener('scroll', this.handleMobileMenuScroll)
        })
      } else {
        this.enableScrollOnBody()
        this.mobileHeaderScrollbar.removeEventListener('scroll', this.handleMobileMenuScroll)
      }
    },

    // Methods of case pages
    getDOMSelectors() {
      this.caseHeader = document.getElementById('case-header')
      this.headerWhiteLogoText = document.getElementById('header-logo-text')
      this.caseFirstSection = document.getElementById('case-first-section')
      this.caseGoDeeScrollContainer = document.getElementById('case-scroll-container')
    },

    setWidthForHeader() {
      const scrollBarWidth = this.caseGoDeeScrollContainer.offsetWidth - this.caseGoDeeScrollContainer.clientWidth
      if (this.$refs.header && this.$refs.overlay) {
        if (window.innerWidth >= 991) {
          this.$refs.header.style.width = `calc(100% - ${scrollBarWidth}px)`
          this.$refs.overlay.style.width = `calc(100% - ${scrollBarWidth}px)`
        } else {
          this.$refs.header.style.width = '100%'
          this.$refs.overlay.style.width = '100%'
        }
      }
    },

    setStylesForHeader() {
      const scrollFromTop = this.$nuxt.$route.path.includes('/godee')
        ? this.caseGoDeeScrollContainer.scrollTop
        : window.scrollY
      if (this.$refs.overlay && this.headerWhiteLogoText) {
        this.$refs.overlay.style.opacity =
          1.6 -
          (this.$refs.overlay.offsetHeight -
            (scrollFromTop - this.caseHeader.getBoundingClientRect().height) -
            this.$refs.headerContainer.offsetHeight) /
            this.$refs.overlay.offsetHeight
        this.headerWhiteLogoText.style.opacity =
          -0.4 -
          (this.$refs.overlay.offsetHeight - this.caseFirstSection.getBoundingClientRect().top) /
            this.$refs.overlay.offsetHeight
      }
    },

    scrollHandler() {
      if (this.$nuxt.$route.path.includes('/case-studies/')) {
        this.setStylesForHeader()
      }
      this.changeLogoState(window.pageYOffset)
    },

    addEventListeners() {
      window.addEventListener('scroll', this.scrollHandler)
      if (this.isCasePage && this.$nuxt.$route.path.includes('/godee')) {
        window.addEventListener('resize', this.setWidthForHeader)
        this.caseGoDeeScrollContainer.addEventListener('scroll', this.scrollHandler)
      }
    },

    removeEventListeners() {
      if (this.$nuxt.$route.path.includes('/godee')) {
        window.removeEventListener('resize', this.setWidthForHeader)
        this.caseGoDeeScrollContainer.removeEventListener('scroll', this.scrollHandler)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.header {
  width: 100%;
  height: 40px;
  padding: 11px 0;
  position: fixed;
  z-index: 3;
  background-color: $bgcolor--black;

  &__burger {
    display: none;
    position: fixed;
    top: 0;
    right: 25px;
    padding: 11px 14px;

    &--close {
      width: 22px;
      height: 22px;
      margin-top: 3px;
      margin-right: 3px;
    }
  }

  &__header-logo {
    width: 34px;
    height: 58px;
    margin: -3px -33px 0 -65px;
  }

  &__left-nav_bar,
  &__right-content {
    display: flex;
    align-items: center;
  }

  &__right-content {
    justify-content: flex-end;
  }

  &__phone-wrapper,
  &__header-routes_links,
  button {
    margin-bottom: 29px;
  }

  button {
    width: 132px;
    height: 39px;
    border-radius: 4px;
    border-color: $text-color--red-opacity;
  }

  &__navigation-link,
  &__header-phone {
    color: $text-color--white;
  }

  &__navigation-link,
  &__header-phone,
  button {
    font-size: 16px;
    font-family: 'Poppins-Regular', sans-serif;
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  &__navigation-link {
    margin-right: 15px;

    &::after {
      content: '↓';
      font-size: 17px;
      font-family: 'Poppins-Regular', sans-serif;
      color: transparent;
    }
  }

  .nuxt-link-active {
    color: $text-color--red;

    &::after {
      color: $text-color--red;
    }
  }

  &__phone-wrapper {
    display: flex;
    align-items: center;
    margin-right: 40px;

    @media screen and (max-width: 1366px) {
      margin-right: 49px;
    }

    @media screen and (max-width: 1280px) {
      margin-right: 33px;
    }

    @media screen and (max-width: 1024px) {
      margin-right: 20px;
    }
  }

  &__header-phone {
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 7px;
    cursor: pointer;

    img {
      position: absolute;
      top: 4px;
      left: 0;
    }
  }

  &__phone-flag {
    display: block;
    width: 18px;
    height: 14px;
  }

  &.transparent {
    background: transparent;
  }
}

#overlay {
  width: 100%;
  height: 40px;
  padding: 11px 0;
  position: fixed;
  z-index: 2;
  background-color: $bgcolor--black;
  opacity: 0;
  transition: opacity 0.6s;

  @media screen and (max-width: 991px) {
    height: 48px;
    padding: 0;
  }
}

.mobile-menu_is-open {
  width: 100%;
  height: 100%;
  position: fixed;
  padding: initial;
  z-index: 999;
}

@media screen and (max-width: 991px) {
  .header {
    max-height: 26px;

    &__burger {
      display: block;
    }

    &__left-nav_bar {
      margin-top: 0;
    }

    &__header-routes_links {
      display: none;
    }

    &__right-content {
      display: none;
    }

    &__header-logo {
      width: 28px;
      height: 49px;
      margin-top: 20px;
      margin-left: -55px;
    }
  }
}

@media screen and (max-width: 767px) {
  .header {
    &__burger {
      right: 10px;
    }

    &__header-logo {
      margin-left: -40px;
    }
  }
}

@media screen and (max-width: 576px) {
  .header {
    &__header-logo {
      margin-left: -25px;
    }
  }
}

@media screen and (max-width: 440px) {
  .header {
    &__header-logo {
      margin-left: 0;
    }
  }
}
</style>