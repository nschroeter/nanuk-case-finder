import type { NanukCase, GearDimensions, Unit } from './types'

export function filterAndSort(
  cases: NanukCase[],
  gear: GearDimensions,
  unit: Unit,
): NanukCase[] {
  const length = parseFloat(gear.length)
  const width = parseFloat(gear.width)
  const height = parseFloat(gear.height)

  const hasInput = !isNaN(length) || !isNaN(width) || !isNaN(height)

  if (!hasInput) {
    return [...cases].sort((a, b) => a.model.localeCompare(b.model))
  }

  return cases
    .filter(c => {
      const interior = c.interior[unit]
      if (!isNaN(length) && interior.length < length) return false
      if (!isNaN(width) && interior.width < width) return false
      if (!isNaN(height) && interior.height < height) return false
      return true
    })
    .sort((a, b) => {
      const volumeA = a.interior[unit].length * a.interior[unit].width * a.interior[unit].height
      const volumeB = b.interior[unit].length * b.interior[unit].width * b.interior[unit].height
      return volumeA - volumeB
    })
}
