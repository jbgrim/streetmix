import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export default function ListItem ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
      <Text style={{ marginHorizontal: 10, color: '#FF7D0B' }}>•</Text>
      {typeof children === 'string'
        ? (
          <Text>{children}</Text>
          )
        : (
          <View>{children}</View>
          )}
    </View>
  )
}
