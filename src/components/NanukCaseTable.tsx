import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Trans } from '@lingui/react/macro'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import type { NanukCase, Unit } from '../types'

interface Props {
  cases: NanukCase[]
  unit: Unit
}

const colWidths = [180, 120, 120, 120, 120, 120, 120, 100, 160]
const bold = { fontWeight: 'bold' }
const groupLeft = { borderLeft: '2px solid !important', borderLeftColor: 'grey.500 !important' }
const groupRight = { borderRight: '2px solid !important', borderRightColor: 'grey.500 !important' }

const subHeaderSx = (i: number) => {
  if (i === 0 || i === 3) return { ...bold, ...groupLeft }
  if (i === 2 || i === 5) return { ...bold, ...groupRight }
  return bold
}

const dimLabels = [
  msg`Length`, msg`Width`, msg`Height`,
  msg`Length`, msg`Width`, msg`Height`,
]

export default function NanukCaseTable({ cases, unit }: Readonly<Props>) {
  const { _ } = useLingui()

  if (cases.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 4 }}>
        <Trans>No cases match your dimensions.</Trans>
      </Typography>
    )
  }

  const weightKey = unit === 'in' ? 'emptyWeightLb' : 'emptyWeightKg'
  const weightUnit = unit === 'in' ? 'lb' : 'kg'

  return (
    <TableContainer component={Paper} sx={{ mt: 4, overflowX: 'auto', border: '2px solid', borderColor: 'grey.500' }}>
      <Table size="small" sx={{ minWidth: 'max-content', tableLayout: 'fixed', '& td, & th': { border: '1px solid', borderColor: 'grey.300' }, '& thead tr:last-child th, & thead th[rowspan]': { borderBottom: '2px solid', borderBottomColor: 'grey.500' } }}>
        <colgroup>
          {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} sx={bold}><Trans>Model</Trans></TableCell>
            <TableCell colSpan={3} align="center" sx={{ ...bold, ...groupLeft, ...groupRight }}>
              {_(msg`Interior`)} ({unit})
            </TableCell>
            <TableCell colSpan={3} align="center" sx={{ ...bold, ...groupLeft, ...groupRight }}>
              {_(msg`Exterior`)} ({unit})
            </TableCell>
            <TableCell rowSpan={2} sx={bold}><Trans>Volume (L)</Trans></TableCell>
            <TableCell rowSpan={2} sx={bold}>{_(msg`Empty weight`)} ({weightUnit})</TableCell>
          </TableRow>
          <TableRow>
            {dimLabels.map((label, i) => (
              <TableCell key={i} sx={subHeaderSx(i)}>{_(label)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.map(c => {
            const interior = c.interior[unit]
            const exterior = c.exterior[unit]
            return (
              <TableRow key={c.model} hover>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{c.model}</TableCell>
                <TableCell sx={groupLeft}>{interior.length}</TableCell>
                <TableCell>{interior.width}</TableCell>
                <TableCell sx={groupRight}>{interior.height}</TableCell>
                <TableCell sx={groupLeft}>{exterior.length}</TableCell>
                <TableCell>{exterior.width}</TableCell>
                <TableCell sx={groupRight}>{exterior.height}</TableCell>
                <TableCell>{c.volumeL ?? '—'}</TableCell>
                <TableCell>{c[weightKey] ?? '—'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
