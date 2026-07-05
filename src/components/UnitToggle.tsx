import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import type { Unit } from '../types'

interface Props {
  unit: Unit
  onChange: (unit: Unit) => void
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <FormControl>
      <FormLabel>Unit</FormLabel>
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
