export const snakeCaseToCamelCaseString = <T extends string = string>(
  snakeCaseString: string,
): T => {
  return snakeCaseString.replaceAll(/_([\da-z])/g, (_, letter) => {
    return letter.toUpperCase()
  }) as T
}
