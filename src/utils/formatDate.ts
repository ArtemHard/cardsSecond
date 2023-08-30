export function formatDate(serverDate: Date): string {
  const addZeroToTime = (time: string) => {
    if (time.length < 1) return '00'
    if (time.length === 1) return '0' + time
    else return time
  }
  const date = new Date(serverDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  const hours = addZeroToTime(date.getHours().toString())

  const minuets = addZeroToTime(date.getMinutes().toString())
  const formattedDate = `${day}.${month}.${year} ${hours}:${minuets}`

  return formattedDate
}
