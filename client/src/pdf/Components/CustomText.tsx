import React from 'react'
import { Text, type TextProps } from '@react-pdf/renderer'
import reactStringReplace from 'react-string-replace'

/**
 * @see: [React PDF Issue #598](https://github.com/diegomura/react-pdf/issues/598)
 * @description Custom text component to replace the narrow no-break space with a regular space
 */
export const CustomText = ({
  children,
  ...props
}: { children: string } & TextProps): React.ReactElement => (
  <Text {...props}>
    {reactStringReplace(children, /(\u{202F})/gu, () => ' ')}
  </Text>
)
