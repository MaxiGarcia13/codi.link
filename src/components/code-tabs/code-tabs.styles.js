import { css } from 'lit'

export const codeTabsStyles = css`
  .nav {
    cursor: pointer;
  }
  .codeTabs {

    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .codeTabs__tab {
    color: #c5c5c5;
    padding: 10px 15px;
    padding-right: 0;
    border-bottom: 3px solid transparent;
    height: 18px;
  }

  .codeTabs__tab-active {
    border-bottom: 3px solid #c5c5c5;
    font-weight: 600;
  }

  .codeTabs__tab__text {
    cursor: pointer;
  }

  .codeTabs__tab__button {
    background-color: transparent;
    border-style: none;
    color: #c5c5c5;
    cursor: pointer;
    border-radius: 4px;
  }

  .codeTabs__tab__button:hover {
    background-color: rgba(0,0,0, .2);
  }
`
