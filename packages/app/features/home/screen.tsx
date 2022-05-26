import { parse } from 'expo-linking'
import React, { useState } from 'react'
import { YStack, XStack, TextArea, Button, Text, Progress } from 'tamagui'

class Agenda {
  minutes: number
  lines: Line[] | null
}

class Line {
  minutes: number
  text: string
}

function parseLine(text: string): Line {
  const regex = /[0-9]+m/g
  const found = text.match(regex)
  const line = new Line()
  if (found && found.length > 0) {
    const match = found[0]!
    const minutes = parseInt(match.replace('m', ''))
    line.minutes = minutes
    line.text = text.replace(match, '').trim()
    return line
  } else {
    line.minutes = 0
    line.text = text.trim()
    return line
  }
}

function parseAgenda(text: string): Agenda {
  const lines = text.split('\n').map((x) => parseLine(x))
  const agenda = new Agenda()
  agenda.lines = lines
  const lineCount = lines.length
  const totalMinutes = lines.map((x) => x.minutes).reduce((prev, cur) => prev + cur, 0)
  agenda.minutes = totalMinutes
  if (lineCount > 1) {
    const lastLine = lines[lineCount - 1]!
    console.log(lastLine)
    console.log(totalMinutes)
    if (lastLine.text.length == 0 && lastLine.minutes > totalMinutes - lastLine.minutes) {
      console.log('hi')
      agenda.minutes = lastLine.minutes
    }
  }
  return agenda
}

export function HomeScreen() {
  const rowsInit: Line[] = [new Line(), new Line()]
  const agendaInit: Agenda = new Agenda()
  const [rows, setRows] = useState(rowsInit)
  const [agenda, setAgenda] = useState(agendaInit)
  return rows.map((line, index) => {
    if (index === 0) {
      return (
        <YStack>
          <TextArea
            size="$4"
            fontSize={20}
            borderWidth={2}
            onChange={(t) => {
              const text = t.target.value
              setAgenda(parseAgenda(text))
              setRows(rowsInit.concat(agenda.lines ?? []))
            }}
          />
          <Text fontFamily="$body" fontSize={20}>{`${agenda.minutes} minutes`}</Text>
        </YStack>
      )
    } else if (index === 1) {
      return (
        <Button size="$6" backgroundColor="green">
          Start
        </Button>
      )
    }
    return (
      <YStack borderWidth={2} padding={10}>
        {line.minutes > 0 && (
          <YStack>
            <XStack space>
              <Text fontFamily="$body" fontSize={20} backgroundColor="blue">
                {line.minutes}
              </Text>
              <Text fontFamily="$body" fontSize={20}>
                {line.text}
              </Text>
            </XStack>
            <Progress flex={1} value={100}>
              <Progress.Indicator animation="bouncy" />
            </Progress>
          </YStack>
        )}
        {line.minutes == 0 && (
          <Text fontFamily="$body" fontSize={20}>
            {line.text}
          </Text>
        )}
      </YStack>
    )
  })
}
