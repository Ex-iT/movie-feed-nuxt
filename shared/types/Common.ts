import type { EnrichedProgrammesRaw } from './EnrichedProgrammesRaw'
import type { Generic } from './Generic'
import type { MetaData } from './MetaData'

export enum Days {
  today = '0',
  tomorrow = '1',
}

export interface ProgrammesRaw {
  db_id?: string // Legacy ID
  ps: string
  pe: string
  ch_id: string
  title: string
  descr?: string
  rating?: string
  is_type?: string
  subgenre?: string
  tvg_rating?: string
  main_id: string
}

export interface MovieDetails {
  generic: Generic
  metadata: MetaData
}

export interface Programme extends EnrichedProgrammesRaw {
  details?: MovieDetails
}

export interface ProgrammesLog {
  message: string
  success: boolean
}

export interface Programmes {
  createdAt: number
  today: Programme[]
  tomorrow: Programme[]
  log: ProgrammesLog
}

export interface Status {
  createdAt: string
  log: ProgrammesLog
}

export interface FetchData {
  pending: boolean
  error: Error | undefined
  data: Programmes | {
    today: never[]
    tomorrow: never[]
    log: Record<string, any>
    createdAt: number
  }
  refresh: () => Promise<void>
}
