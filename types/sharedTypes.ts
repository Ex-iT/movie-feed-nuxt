export interface Error {
  ok: boolean
  error: string
}

export enum Days {
  today = '0',
  tomorrow = '1',
}

export interface Prog {
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

export interface EnrichedProg extends Prog {
  channel_logo: string
  channel_label: string
  start: string
  end: string
  is_passed: boolean
  progress: number
  deep_link: string
  day: string
}

interface Generic {
  id: number
  title: string
  year?: string
  imdb?: string
  yt_id?: string
  subcategory?: string
  image?: string
  duration?: string
}

interface Items {
  label: string
  value: string
}

interface Guidance {
  name: string
  short: string
  icon: string
}

export interface MovieDetails {
  generic: Generic
  metadata: {
    items?: Array<Items>
    guidance?: Array<Guidance>
  }
}

export interface FetchtState {
  pending: boolean
  error: boolean
  timestamp: number
}

export interface CacheableProg extends EnrichedProg {
  details: MovieDetails
}

export interface Cacheables {
  createdAt: number
  today: CacheableProg[]
  tomorrow: CacheableProg[]
  log: {
    message: string
    success: boolean
  }
}
