export type Unit = 'in' | 'mm'

export interface Dimensions {
  length: number
  width: number
  height: number
}

export interface NanukCase {
  model: string
  interior: { in: Dimensions; mm: Dimensions }
  exterior: { in: Dimensions; mm: Dimensions }
  volumeL: number | null
  emptyWeightLb: number | null
  emptyWeightKg: number | null
}

export interface GearDimensions {
  length: string
  width: string
  height: string
}
