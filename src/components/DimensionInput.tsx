import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'
import type { GearDimensions, Unit } from '../types'

interface Props {
  dimensions: GearDimensions
  unit: Unit
  onChange: (dimensions: GearDimensions) => void
}

const fields = ['length', 'width', 'height'] as const

const fieldMsgs = {
  length: msg`Length`,
  width: msg`Width`,
  height: msg`Height`,
}

export default function DimensionInput({ dimensions, unit, onChange }: Readonly<Props>) {
  const { _ } = useLingui()
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      {fields.map(field => (
        <TextField
          key={field}
          label={`${_(fieldMsgs[field])} (${unit})`}
          type="number"
          value={dimensions[field]}
          onChange={e => onChange({ ...dimensions, [field]: e.target.value })}
          slotProps={{
            htmlInput: { min: 0 },
            input: dimensions[field] ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onChange({ ...dimensions, [field]: '' })}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            } : {},
          }}
          placeholder="—"
          size="small"
          fullWidth
        />
      ))}
    </Stack>
  )
}
