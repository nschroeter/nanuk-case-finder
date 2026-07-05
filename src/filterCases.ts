import type { NanukCase, GearDimensions, Unit } from './types'

export function filterAndSort(
  cases: NanukCase[],
  gearInterior: GearDimensions,
  maxExterior: GearDimensions,
  unit: Unit,
): NanukCase[] {
  const iLength = parseFloat(gearInterior.length)
  const iWidth = parseFloat(gearInterior.width)
  const iHeight = parseFloat(gearInterior.height)
  const eLength = parseFloat(maxExterior.length)
  const eWidth = parseFloat(maxExterior.width)
  const eHeight = parseFloat(maxExterior.height)

  const hasInput =
    !isNaN(iLength) || !isNaN(iWidth) || !isNaN(iHeight) ||
    !isNaN(eLength) || !isNaN(eWidth) || !isNaN(eHeight)

  if (!hasInput) {
    return [...cases].sort((a, b) => a.model.localeCompare(b.model))
  }

  return cases
    .filter(c => {
      const interior = c.interior[unit]
      const exterior = c.exterior[unit]
      if (!isNaN(iLength) && interior.length < iLength) return false
      if (!isNaN(iWidth) && interior.width < iWidth) return false
      if (!isNaN(iHeight) && interior.height < iHeight) return false
      if (!isNaN(eLength) && exterior.length > eLength) return false
      if (!isNaN(eWidth) && exterior.width > eWidth) return false
      if (!isNaN(eHeight) && exterior.height > eHeight) return false
      return true
    })
    .sort((a, b) => {
      const volumeA = a.interior[unit].length * a.interior[unit].width * a.interior[unit].height
      const volumeB = b.interior[unit].length * b.interior[unit].width * b.interior[unit].height
      return volumeA - volumeB
    })
}
