import React, { useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
// Importing 'property-information' is a workaround for Parcel + React-Markdown bug
// https://github.com/parcel-bundler/parcel/discussions/9113
import 'property-information'
import ReactMarkdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'
import Transition, {
  type TransitionStatus
} from 'react-transition-group/Transition'

import { app } from '~/src/preinit/app_settings'
import Triangle from './Triangle'
import './DescriptionPanel.css'

const TRANSITION_DURATION = 250
const DEFAULT_STYLE = {
  opacity: 0,
  transformOrigin: '50% 0',
  transform: 'rotateX(20deg) translateY(100px)',
  transition: `opacity ${TRANSITION_DURATION}ms, transform ${TRANSITION_DURATION}ms`
}
const TRANSITION_STYLES: Partial<
Record<TransitionStatus, React.CSSProperties>
> = {
  entering: {
    opacity: 1,
    transform: 'none'
  },
  entered: {
    opacity: 1,
    transform: 'none'
  }
}

// TODO: less reliance on querying other DOM elements, if possible
// TODO: document all magic numbers
export function getStreetSectionTop (): number {
  let streetSectionTop

  // not _always_ equal to 100vh, but for our purposes, it is
  const viewportHeight = window.innerHeight

  // TODO this will always be the same, since in CSS this is a fixed number.
  const streetSectionHeight =
    document.querySelector<HTMLDivElement>('#street-section-inner')
      ?.offsetHeight ?? 0

  // TODO const
  if (viewportHeight - streetSectionHeight > 450) {
    streetSectionTop =
      (viewportHeight - streetSectionHeight - 450) / 2 + 450 + 80
  } else {
    streetSectionTop = viewportHeight - streetSectionHeight + 70
  }

  if (app.readOnly) {
    streetSectionTop += 80
  }

  return streetSectionTop
}

interface DescriptionPanelProps {
  visible: boolean
  image: string
  content: string
  caption: string
  onClickHide: (e: React.MouseEvent) => void
  bubbleY: number
  offline: boolean
}

function DescriptionPanel ({
  visible = false,
  image,
  content,
  caption,
  onClickHide = (e) => {},
  bubbleY,
  offline = false
}: DescriptionPanelProps): React.ReactElement {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [highlightTriangle, setHighlightTriangle] = useState(false)

  function unhighlightTriangleDelayed (): void {
    window.setTimeout(() => {
      setHighlightTriangle(false)
    }, 200)
  }

  function handleToggleHighlightTriangle (): void {
    setHighlightTriangle(!highlightTriangle)
  }

  function handleClickHide (event: React.MouseEvent): void {
    onClickHide(event)
    unhighlightTriangleDelayed()
  }

  // TODO document magic numbers
  const height = getStreetSectionTop() + 300 - bubbleY + 'px'

  const allowedElements = [
    'p',
    'em',
    'strong',
    'ol',
    'ul',
    'li',
    'blockquote',
    'h1'
  ]
  if (!offline) {
    allowedElements.push('a')
  }

  return (
    <Transition in={visible} timeout={TRANSITION_DURATION} nodeRef={nodeRef}>
      {(state) => (
        <div
          className="description-canvas"
          style={{
            ...DEFAULT_STYLE,
            ...TRANSITION_STYLES[state],
            height
          }}
          ref={nodeRef}
        >
          <div className="description">
            <div className="description-content">
              {image && (
                <img
                  src={`/images/info-bubble-examples/${image}`}
                  alt={caption ?? ''}
                />
              )}
              <div className="description-text">
                <ReactMarkdown
                  allowedElements={allowedElements}
                  unwrapDisallowed
                  rehypePlugins={[
                    [
                      rehypeExternalLinks,
                      { rel: 'noopener noreferrer', target: '_blank' }
                    ]
                  ]}
                >
                  {content}
                </ReactMarkdown>
                {caption && (
                  <footer>
                    <FormattedMessage
                      id="segments.description.photo-credit"
                      defaultMessage="Photo:"
                    />
                    &nbsp;
                    {caption}
                  </footer>
                )}
              </div>
            </div>
          </div>
          <div
            className="description-close"
            onClick={handleClickHide}
            onMouseOver={handleToggleHighlightTriangle}
            onMouseOut={handleToggleHighlightTriangle}
          >
            <FormattedMessage id="btn.close" defaultMessage="Close" />
          </div>
          <Triangle highlight={highlightTriangle} />
        </div>
      )}
    </Transition>
  )
}

export default DescriptionPanel
