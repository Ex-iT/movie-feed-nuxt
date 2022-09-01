import fetch from 'node-fetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = async (uri: string): Promise<any> => {
  try {
    const response = await fetch(uri)

    if (response.status === 200) {
      return await response.json()
    } else {
      const { url, status, statusText } = response

      return {
        url,
        status,
        statusText,
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error || 'An unexpected error occurred.')
  }
}

export default fetchData
