import { FetchtState } from '~/types/sharedTypes'

export const FetchStateProp = {
  type: Object as () => FetchtState,
  default: () => ({
    pending: false,
    error: false,
  }),
  required: true,
}
