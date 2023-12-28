export const objectWithCamelCaseKeys = <OutputObject>(
  object: Record<string, unknown> | undefined | null,
): OutputObject | undefined => {
  if (!object) {
    return undefined
  }

  const entries = Object.entries(object)
  const camelCaseEntries = entries.map(([key, value]) => {
    const camelCaseKey = key.replaceAll(/_([a-z])/g, (_, letter) => {
      return letter.toUpperCase()
    })

    return [camelCaseKey, value]
  })

  return Object.fromEntries(camelCaseEntries)
}
