import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import logo from 'url:../../images/logo_horizontal.svg'
import { useSelector } from '../store/hooks'
import AccessibleIcon from '../ui/AccessibleIcon'
import Icon from '../ui/Icon'
import { doAdminSignIn, doSignIn } from '../users/authentication'
import USER_ROLES from '../../../app/data/user_roles.json'
import InstanceBadge from './InstanceBadge'
import MenuBarItem from './MenuBarItem'
import SignInButton from './SignInButton'
import UpgradeButton from './UpgradeButton'
import AvatarMenu from './AvatarMenu'

import type { UserProfile } from '../types'
import './MenuBar.css'
import { fetchCurrentAdminUser } from '~src/app/routing'
import { setSignInData } from '~src/store/slices/user'
import AdminSignInButton from './AdminSignIn'

interface MenuBarProps {
  onMenuDropdownClick: (menu: string, node: HTMLElement) => void
}

function MenuBar ({ onMenuDropdownClick }: MenuBarProps): React.ReactElement {
  const user = useSelector((state) => state.user.signInData?.details)
  const isSubscriber = useSelector(
    (state) => state.user.signedIn && state.user.isSubscriber
  )

  const isAdminUser: boolean =
    user?.roles?.includes(USER_ROLES.ADMIN.value) ?? false

  const offline = useSelector((state) => state.system.offline)
  const enableLocaleSettings = useSelector(
    (state) =>
      state.flags.LOCALES_LEVEL_1.value ||
      state.flags.LOCALES_LEVEL_2.value ||
      state.flags.LOCALES_LEVEL_3.value
  )
  const menuBarRightEl = useRef<HTMLUListElement>(null)
  const menuBarLeftEl = useRef<HTMLUListElement>(null)
  const intl = useIntl()

  const languageLabel = intl.formatMessage({
    id: 'settings.language.label',
    defaultMessage: 'Language'
  })

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    // StreetNameplateContainer needs to know the left position of the right
    // menu bar when it's mounted
    window.addEventListener('stmx:streetnameplate_mounted', handleWindowResize)

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener(
        'stmx:streetnameplate_mounted',
        handleWindowResize
      )
    }
  })

  /**
   * Handles clicks on <button> elements which result in a dropdown menu.
   * Pass in the name of this menu, and it returns (curries) a function
   * that handles the event.
   */
  function handleClick (menu: string): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent) => {
      const el = (event.target as HTMLElement).closest('button')
      if (el !== null) {
        onMenuDropdownClick(menu, el)
      }
    }
  }

  function handleWindowResize (): void {
    // Throw this event so that the StreetName can figure out if it needs
    // to push itself lower than the menubar
    const rightMenuBarLeftPos =
      menuBarRightEl.current?.getBoundingClientRect().left
    const leftMenuBarRightPos =
      menuBarLeftEl.current?.getBoundingClientRect().right
    window.dispatchEvent(
      new CustomEvent('stmx:menu_bar_resized', {
        detail: {
          rightMenuBarLeftPos,
          leftMenuBarRightPos
        }
      })
    )
  }

  const renderUserAvatar = useCallback((): React.ReactElement => {
    return user
      ? (
        <li>
          <AvatarMenu
            user={user}
            isSubscriber={isSubscriber}
            onClick={handleClick('identity')}
          />
        </li>
        )
      : (
        <li>
          <SignInButton onClick={doSignIn} />
        </li>
        )
  }, [isSubscriber, doSignIn, handleClick, user])

  function renderAdminSignInButton (): React.ReactElement {
    return (
      <li>
        <AdminSignInButton onClick={doAdminSignIn} />
      </li>
    )
  }

  return (
    <nav className="menu-bar" role="menubar" aria-orientation="horizontal">
      <ul className="menu-bar-left" ref={menuBarLeftEl}>
        <li className="menu-bar-title">
          <img src={logo} alt="Streemix" className="menu-bar-logo" />
          <h1>Streetmix</h1>
        </li>
        <MenuBarItem
          label="Help"
          translation="menu.item.help"
          id="menubar-help"
          onClick={handleClick('help')}
        />
        {!offline && (
          <>
            <MenuBarItem
              label="Contact"
              translation="menu.item.contact"
              id="menubar-contact"
              onClick={handleClick('contact')}
            />
            {!isSubscriber && <UpgradeButton />}
          </>
        )}
      </ul>
      <ul className="menu-bar-right" ref={menuBarRightEl}>
        {!isAdminUser && renderAdminSignInButton()}
        <MenuBarItem
          label="New street"
          translation="menu.item.new-street"
          id="menubar-new"
          onClick={handleClick('new')}
        />
        <MenuBarItem
          label="Share"
          translation="menu.item.share"
          id="menubar-share"
          onClick={handleClick('share')}
        />
        {enableLocaleSettings && (
          <MenuBarItem
            id="menubar-locale"
            onClick={handleClick('locale')}
            tooltip={languageLabel}
          >
            <AccessibleIcon label={languageLabel}>
              <Icon name="language" />
            </AccessibleIcon>
          </MenuBarItem>
        )}
        {!offline && renderUserAvatar()}
      </ul>
      <InstanceBadge />
    </nav>
  )
}

export default MenuBar
