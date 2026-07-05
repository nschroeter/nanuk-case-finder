import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Trans } from '@lingui/react/macro'
import type { Unit } from '../types'

interface Props {
  unit: Unit
  onChange: (unit: Unit) => void
}

export default function UnitToggle({ unit, onChange }: Readonly<Props>) {
  return (
    <FormControl>
      <FormLabel><Trans>Unit</Trans></FormLabel>
      <RadioGroup
        row
        value={unit}
        onChange={e => onChange(e.target.value as Unit)}
      >
        <FormControlLabel value="mm" control={<Radio />} label="mm" />
        <FormControlLabel value="in" control={<Radio />} label="in" />
      </RadioGroup>
    </FormControl>
  )
}
