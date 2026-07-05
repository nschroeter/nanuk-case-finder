import { useEffect, useState } from 'react'
import { Button, Checkbox, Container, FormControlLabel, Stack, Typography } from '@mui/material'
import { useNanukCases } from './useNanukCases'
import { filterAndSort } from './filterCases'
import UnitToggle from './components/UnitToggle'
import DimensionInput from './components/DimensionInput'
import NanukCaseTable from './components/NanukCaseTable'
import type { GearDimensions, Unit } from './types'

const emptyDimensions: GearDimensions = { length: '', width: '', height: '' }

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function App() {
  const allCases = useNanukCases()
  const [unit, setUnit] = useState<Unit>('mm')
  const [gearInterior, setGearInterior] = useState<GearDimensions>(emptyDimensions)
  const [maxExterior, setMaxExterior] = useState<GearDimensions>(emptyDimensions)
  const [showExterior, setShowExterior] = useState(false)

  const debouncedInterior = useDebounce(gearInterior, 300)
  const debouncedExterior = useDebounce(maxExterior, 300)
  const visibleCases = filterAndSort(allCases, debouncedInterior, debouncedExterior, unit)

  function reset() {
    setGearInterior(emptyDimensions)
    setMaxExterior(emptyDimensions)
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        NANUK Case Finder
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Enter your gear dimensions to find the best fitting NANUK case.
      </Typography>

      <Stack spacing={3} className="mt-6">
        <UnitToggle unit={unit} onChange={setUnit} />
        <div>
          <Typography variant="caption" color="text.secondary">Min. interior</Typography>
          <DimensionInput dimensions={gearInterior} unit={unit} onChange={setGearInterior} />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox checked={showExterior} onChange={e => { setShowExterior(e.target.checked); if (!e.target.checked) setMaxExterior(emptyDimensions) }} size="small" />}
            label={<Typography variant="caption" color="text.secondary">Filter by max. exterior</Typography>}
          />
          {showExterior && <DimensionInput dimensions={maxExterior} unit={unit} onChange={setMaxExterior} />}
        </div>
        <Button variant="outlined" size="small" onClick={reset} sx={{ alignSelf: 'flex-start' }}>
          Reset
        </Button>
      </Stack>


      <NanukCaseTable cases={visibleCases} unit={unit} />
    </Container>
  )
}
