export const splitTextIntoLines = (text: string, font: any, fontSize: number, maxWidth: number): string[] => {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const testWidth = font.widthOfTextAtSize(testLine, fontSize)

    if (testWidth <= maxWidth && currentLine) {
      currentLine = testLine
    } else if (testWidth <= maxWidth) {
      currentLine = word
    } else {
      // Слово не влізає — зберігаємо поточний рядок, починаємо новий
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) lines.push(currentLine)
  return lines
}
