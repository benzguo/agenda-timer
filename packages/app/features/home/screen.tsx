// debug
import React, { useState } from 'react'
import { YStack } from '@my/ui'
import { TextArea, Text } from 'tamagui'

export function HomeScreen() {
  const rowsInit = ['']
  const [rows, setRows] = useState(rowsInit)
  return rows.map((item, index) => {
    if (index === 0) {
      return (
        <TextArea
          size="$4"
          borderWidth={2}
          onChange={(t) => {
            const text = t.target.value
            const lines = text.split('\n')
            setRows(rowsInit.concat(lines))
          }}
        />
      )
    }
    return (
      <YStack borderWidth={2} padding={10}>
        <Text fontFamily="$body" fontSize={20}>
          {item}
        </Text>
      </YStack>
    )
  })
}
