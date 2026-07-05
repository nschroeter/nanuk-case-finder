import { useEffect, useState } from 'react'
import { Button, Checkbox, Container, FormControlLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Trans } from '@lingui/react/macro'
import { useNanukCases } from './useNanukCases'
import { filterAndSort } from './filterCases'
import { loadCatalog, localeLabels, type Locale } from './i18n'
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
  const [locale, setLocale] = useState<Locale>('en')
  const [gearInterior, setGearInterior] = useState<GearDimensions>(emptyDimensions)
  const [maxExterior, setMaxExterior] = useState<GearDimensions>(emptyDimensions)
  const [showExterior, setShowExterior] = useState(false)

  const debouncedInterior = useDebounce(gearInterior, 300)
  const debouncedExterior = useDebounce(maxExterior, 300)
  const visibleCases = filterAndSort(allCases, debouncedInterior, debouncedExterior, unit)

  function handleUnitChange(newUnit: Unit) {
    setGearInterior(emptyDimensions)
    setMaxExterior(emptyDimensions)
    setUnit(newUnit)
  }

  function handleLocaleChange(newLocale: Locale) {
    loadCatalog(newLocale)
    setLocale(newLocale)
  }

  function reset() {
    setGearInterior(emptyDimensions)
    setMaxExterior(emptyDimensions)
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
            NANUK Case Finder
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Trans>Enter your gear dimensions to find the best fitting NANUK case.</Trans>
          </Typography>
        </div>
        <Select
          value={locale}
          onChange={e => handleLocaleChange(e.target.value as Locale)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          {(Object.entries(localeLabels) as [Locale, string][]).map(([value, label]) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack spacing={3} className="mt-6">
        <UnitToggle unit={unit} onChange={handleUnitChange} />
        <div>
          <Typography variant="caption" color="text.secondary">
            <Trans>Min. interior</Trans>
          </Typography>
          <DimensionInput dimensions={gearInterior} unit={unit} onChange={setGearInterior} />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox checked={showExterior} onChange={e => { setShowExterior(e.target.checked); if (!e.target.checked) setMaxExterior(emptyDimensions) }} size="small" />}
            label={<Typography variant="caption" color="text.secondary"><Trans>Filter by max. exterior</Trans></Typography>}
          />
          <div style={{ visibility: showExterior ? 'visible' : 'hidden' }}>
            <DimensionInput dimensions={maxExterior} unit={unit} onChange={setMaxExterior} />
          </div>
        </div>
        <Button variant="outlined" size="small" onClick={reset} sx={{ alignSelf: 'flex-start' }}>
          <Trans>Reset</Trans>
        </Button>
      </Stack>

      <NanukCaseTable cases={visibleCases} unit={unit} />
    </Container>
  )
}
