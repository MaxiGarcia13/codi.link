import { LitElement, html } from 'lit'
// import { $$ } from '../../utils/dom.js'
// import { decode } from 'js-base64'
import { codeTabsStyles } from './code-tabs.styles'

export class CodeTabs extends LitElement {
  static get styles () {
    return codeTabsStyles
  }

  constructor () {
    super()
    const tab = this.generateTab({ pathname: window.location.pathname })

    this.tabs = [tab]
    this.currentTab = tab
  }

  generateTab ({ name = `untitled-${this.tabs ? this.tabs.length + 1 : 1}`, pathname }) {
    return {
      id: `id-${Date.now()}`,
      name,
      pathname
    }
  }

  goToTab (pathname) {
    window.history.replaceState(null, null, pathname)
  }

  createNewTab () {
    const tab = this.generateTab({ pathname: '/' })
    this.tabs = [...this.tabs, tab]

    return tab
  }

  updateTab (id, pathname) {
    const tab = {
      ...this.tabs.find(t => t.id === id),
      pathname
    }

    const index = this.tabs.findIndex(t => t.id === id)

    this.tabs[index] = tab
  }

  deleteTab (id) {
    this.tabs = this.tabs.filter(t => t.id !== id)
  }

  handleCreateNewTab (ev) {
    const tab = this.createNewTab()

    this.handleChageTab(tab, ev)
  }

  handleChageTab (tab, ev) {
    ev.preventDefault()

    this.updateTab(this.currentTab.id, window.location.pathname)

    this.goToTab(tab.pathname)

    this.currentTab = tab
    this.updateEditors(tab.pathname)
    ev.stopPropagation()

    this.requestUpdate()
  }

  handleDeleteTab (id, ev) {
    ev.preventDefault()

    const index = this.tabs.findIndex(t => t.id === id)
    const tab = this.tabs[index - 1]
    this.currentTab = tab

    this.goToTab(tab.pathname)
    this.deleteTab(id)

    ev.stopPropagation()
    this.requestUpdate()
  }

  updateEditors (pathname) {
    // const editorElements = $$('codi-editor')

    // const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

    // const VALUES = {
    //   markup: rawHtml ? decode(rawHtml) : '',
    //   style: rawCss ? decode(rawCss) : '',
    //   script: rawJs ? decode(rawJs) : ''
    // }

    // editorElements.forEach(editor => {
    //   const value = VALUES[editor.id]
    // })
  }

  render () {
    return html`
    <nav class="nav" @click="${this.handleCreateNewTab}">
      <ul class="codeTabs">
        ${
          this.tabs.map((tab, index) => html`
            <li
              @click="${this.handleChageTab.bind(this, tab)}"
              class="codeTabs__tab ${this.currentTab.id === tab.id && 'codeTabs__tab-active'}"
            >
              <span class="codeTabs__tab__text">
                ${tab.name}
              </span>
              ${
                index > 0
                  ? html`
                  <button
                    class="codeTabs__tab__button"
                    @click="${this.handleDeleteTab.bind(this, tab.id)}"
                  >
                    X
                  </button>`
                  : ''
              }
            </li>
          `)
        }
      </ul>
    </nav>`
  }
}
