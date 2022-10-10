import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { Cacheables, CacheableProg, Days } from '../../types/sharedTypes'
import getFirestoreDb from '../../lib/getFirestoreDb'
import { FIREBASE_COLLECTION, HOUR_SEC } from '../../config'
import getDetails from './getDetails'
import getMovies from './getMovies'

const epoch = Math.floor(new Date().getTime() / 1000)
const db = getFirestoreDb()
const collection = db.collection(FIREBASE_COLLECTION)

const getLatestDoc = async () => {
  const snapshot = await collection.orderBy('createdAt', 'desc').limit(1).get()
  const docs: QueryDocumentSnapshot<DocumentData>[] = []
  snapshot.forEach((doc) => docs.push(doc))
  return docs[0]
}

const shouldUpdate = async () => {
  const latestDoc = await getLatestDoc()

  if (latestDoc) {
    const success = latestDoc.get('log.success')
    const createdAt = latestDoc.get('createdAt')
    const coolDownTime = HOUR_SEC * 3
    if (!success || epoch >= createdAt + coolDownTime) {
      return true
    }
  }

  return false
}

const getMovieData = async (): Promise<Cacheables> => {
  const messages: string[] = []
  let success = true
  let today: CacheableProg[] = []
  let tomorrow: CacheableProg[] = []

  try {
    const [todayProg, tomorrowProg] = await Promise.all([
      getMovies(Days.today) as Promise<CacheableProg[]>,
      getMovies(Days.tomorrow) as Promise<CacheableProg[]>,
    ])

    // 'ok' is only in the object as the request fails and is set to false
    if ('ok' in todayProg && 'ok' in tomorrowProg) {
      success = false
      messages.push('Unable to fetch cacheable movie data.')
    }

    try {
      today = await Promise.all(
        todayProg.map(async (prog) => {
          prog.details = await getDetails(prog.main_id)
          return prog
        })
      )
    } catch (error) {
      success = false
      messages.push('Unable to fetch details for today.')
    }

    try {
      tomorrow = await Promise.all(
        tomorrowProg.map(async (prog) => {
          prog.details = await getDetails(prog.main_id)
          return prog
        })
      )
    } catch (error) {
      success = false
      messages.push('Unable to fetch details for tomorrow.')
    }
  } catch (error) {
    success = false
    messages.push('Unable to fetch cacheable data')
  }

  return {
    createdAt: epoch,
    today,
    tomorrow,
    log: {
      message: messages.join(' '),
      success,
    },
  }
}

const getCacheables = async (): Promise<Cacheables> => {
  if (await shouldUpdate()) {
    const cacheables = await getMovieData()
    const docName = String(new Date().getDay())
    const docRef = collection.doc(docName)

    // Put cacheables in Firestore
    await docRef.set(cacheables)

    return cacheables
  } else {
    // Return the latest cacheables from Firestore
    return (await (await getLatestDoc()).data()) as Cacheables
  }
}

export default getCacheables
