<script>
import { authComputed } from '@state/helpers'

export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    isMenuOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...authComputed,
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
  },
}
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar navbar-expand flex-column flex-md-row navbar-custom">
    <div class="container-fluid">
      <!-- LOGO -->
      <a href="/" class="navbar-brand mr-0 mr-md-2 logo">
        <span class="logo-lg">
          <img
            src="https://cubicasa-wordpress-uploads.s3.amazonaws.com/uploads/cubicasa-logo/cubicasa-logo-dark-icon.svg"
            alt
            height="24"
          />
          <!-- <span class="d-inline h5 ml-2 text-logo">Shreyu</span> -->
        </span>
        <span class="logo-sm">
          <img
            src="https://cubicasa-wordpress-uploads.s3.amazonaws.com/uploads/cubicasa-logo/cubicasa-logo-dark-icon.svg"
            alt
            height="24"
          />
        </span>
      </a>

      <ul
        class="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0"
      >
        <li class>
          <button
            class="button-menu-mobile open-left disable-btn"
            :class="{ open: isMenuOpened }"
            @click="toggleMenu"
          >
            <feather type="menu" class="menu-icon align-middle"></feather>
            <feather type="x" class="close-icon"></feather>
          </button>
        </li>
      </ul>

      <ul
        class="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0"
      >
        <div class="media user-profile mt-2 mb-2">
          <img
            src="@assets/images/users/avatar-7.jpg"
            class="avatar-sm rounded-circle mr-2"
            alt="Shreyu"
          />
          <img
            src="@assets/images/users/avatar-7.jpg"
            class="avatar-xs rounded-circle mr-2"
            alt="Shreyu"
          />

          <div class="media-body">
            <h6 class="pro-user-name mt-0 mb-0">{{ user.name }}</h6>
            <span class="pro-user-desc">Administrator</span>
          </div>
          <b-dropdown
            variant="black"
            class="align-self-center"
            toggle-class="p-0"
			right
          >
            <template v-slot:button-content>
              <feather type="chevron-down" class="align-middle"></feather>
            </template>

            <b-dropdown-item href="/pages/profile" class="notify-item">
              <feather
                type="user"
                class="icon-dual icon-xs mr-2 align-middle"
              ></feather>
              <span>My Account</span>
            </b-dropdown-item>

            <b-dropdown-item href="javascript:void(0);" class="notify-item">
              <feather
                type="settings"
                class="icon-dual icon-xs mr-2 align-middle"
              ></feather>
              <span>Settings</span>
            </b-dropdown-item>

            <b-dropdown-item href="javascript:void(0);" class="notify-item">
              <feather
                type="help-circle"
                class="icon-dual icon-xs mr-2 align-middle"
              ></feather>
              <span>Support</span>
            </b-dropdown-item>

            <b-dropdown-item href="javascript: void(0);" class="notify-item">
              <feather
                type="lock"
                class="icon-dual icon-xs mr-2 align-middle"
              ></feather>
              <span>Lock Screen</span>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item href="/logout" class="notify-item">
              <feather
                type="log-out"
                class="icon-dual icon-xs mr-2 align-middle"
              ></feather>
              <span>Logout</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </ul>
    </div>
  </div>
  <!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
  height: 220px;
}
.ps > .ps__scrollbar-y-rail {
  width: 8px !important;
  background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
  width: 6px !important;
}
.button-menu-mobile {
  outline: none !important;
}
</style>
