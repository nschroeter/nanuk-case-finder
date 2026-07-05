import { useEffect, useState } from 'react'
import type { NanukCase } from './types'

function parseNullable(val: string): number | null {
  const n = parseFloat(val)
  return isNaN(n) ? null : n
}

function parseCsv(text: string): NanukCase[] {
  const [headerLine, ...lines] = text.trim().split('\n')
  const headers = headerLine.replace(/\r/, '').split(',')

  return lines
    .filter(line => line.trim())
    .map(line => {
      const vals = line.replace(/\r/, '').split(',')
      const get = (key: string) => vals[headers.indexOf(key)] ?? ''

      return {
        model: get('model'),
        interior: {
          in: {
            length: parseFloat(get('interiorLengthIn')),
            width: parseFloat(get('interiorWidthIn')),
            height: parseFloat(get('interiorHeightIn')),
          },
          mm: {
            length: parseFloat(get('interiorLengthMm')),
            width: parseFloat(get('interiorWidthMm')),
            height: parseFloat(get('interiorHeightMm')),
          },
        },
        exterior: {
          in: {
            length: parseFloat(get('exteriorLengthIn')),
            width: parseFloat(get('exteriorWidthIn')),
            height: parseFloat(get('exteriorHeightIn')),
          },
          mm: {
            length: parseFloat(get('exteriorLengthMm')),
            width: parseFloat(get('exteriorWidthMm')),
            height: parseFloat(get('exteriorHeightMm')),
          },
        },
        volumeL: parseNullable(get('volumeL')),
        emptyWeightLb: parseNullable(get('emptyWeightLb')),
        emptyWeightKg: parseNullable(get('emptyWeightKg')),
      }
    })
}

export function useNanukCases() {
  const [cases, setCases] = useState<NanukCase[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}nanuk_cases.csv`)
      .then(r => r.text())
      .then(text => setCases(parseCsv(text)))
  }, [])

  return cases
}
