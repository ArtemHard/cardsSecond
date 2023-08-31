export const cutStringParams = (str: string) => {
  const indexCut = str.indexOf(':')

  if (indexCut === -1) return str
  else return str.substring(0, indexCut)
}
