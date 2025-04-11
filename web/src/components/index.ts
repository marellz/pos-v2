import type { Component } from 'vue'
import Alert from '@/components/base/alert.vue'
import Button from '@/components/base/button.vue'
import Card from '@/components/base/card.vue'
import Container from '@/components/base/container.vue'
import Dropdown from '@/components/base/dropdown.vue'
import DropdownItem from '@/components/base/dropdown-item.vue'
import Loader from '@/components/base/loader.vue'
import Modal from '@/components/base/modal.vue'
import Popover from '@/components/base/popover.vue'
import Tag from '@/components/base/tag.vue'

export const components: Record<string, Component> = {
  'base-alert': Alert,
  'base-button': Button,
  'base-card': Card,
  'base-container': Container,
  'base-dropdown': Dropdown,
  'base-dropdown-item': DropdownItem,
  'base-loader': Loader,
  'base-modal': Modal,
  'base-popover': Popover,
  'base-tag': Tag
}
