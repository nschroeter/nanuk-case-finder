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
import type { NanukCase, Unit } from '../types'

interface Props {
  cases: NanukCase[]
  unit: Unit
}

export default function NanukCaseTable({ cases, unit }: Props) {
  if (cases.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 4 }}>
        No cases match your dimensions.
      </Typography>
    )
  }

  const weightKey = unit === 'in' ? 'emptyWeightLb' : 'emptyWeightKg'
  const weightUnit = unit === 'in' ? 'lb' : 'kg'

  return (
    <TableContainer component={Paper} sx={{ mt: 4, overflowX: 'auto' }}>
      <Table size="small" sx={{ minWidth: 'max-content' }}>
        <TableHead>
          <TableRow>
            {[
              'Model',
              `Interior L (${unit})`,
              `Interior W (${unit})`,
              `Interior H (${unit})`,
              `Exterior L (${unit})`,
              `Exterior W (${unit})`,
              `Exterior H (${unit})`,
              'Volume (L)',
              `Weight (${weightUnit})`,
            ].map(header => (
              <TableCell key={header} sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.map(c => {
            const interior = c.interior[unit]
            const exterior = c.exterior[unit]
            return (
              <TableRow key={c.model} hover>
                <TableCell sx={{ fontWeight: 'medium', whiteSpace: 'nowrap' }}>{c.model}</TableCell>
                <TableCell>{interior.length}</TableCell>
                <TableCell>{interior.width}</TableCell>
                <TableCell>{interior.height}</TableCell>
                <TableCell>{exterior.length}</TableCell>
                <TableCell>{exterior.width}</TableCell>
                <TableCell>{exterior.height}</TableCell>
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
