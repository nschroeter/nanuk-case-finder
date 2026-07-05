import { useState } from 'react'
import { Container, Divider, Stack, Typography } from '@mui/material'
import { useNanukCases } from './useNanukCases'
import { filterAndSort } from './filterCases'
import UnitToggle from './components/UnitToggle'
import DimensionInput from './components/DimensionInput'
import NanukCaseTable from './components/NanukCaseTable'
import type { GearDimensions, Unit } from './types'

const emptyDimensions: GearDimensions = { length: '', width: '', height: '' }

export default function App() {
  const allCases = useNanukCases()
  const [unit, setUnit] = useState<Unit>('mm')
  const [gear, setGear] = useState<GearDimensions>(emptyDimensions)

  const visibleCases = filterAndSort(allCases, gear, unit)

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        NANUK Case Finder
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Enter your gear dimensions to find the best fitting NANUK case.
      </Typography>

      <Stack spacing={3} className="mt-6">
        <UnitToggle unit={unit} onChange={setUnit} />
        <DimensionInput dimensions={gear} unit={unit} onChange={setGear} />
      </Stack>

      <Divider className="mt-6" />

      <NanukCaseTable cases={visibleCases} unit={unit} />
    </Container>
  )
}
