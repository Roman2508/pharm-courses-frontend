// RGB colors
export const COLORS = {
  primary: "15, 116, 197",
  secondary: "0, 175, 167",
  success: "58, 151, 66",
  destructive: "231, 0, 11",
  white: "255, 255, 255",
  border: "222, 222, 222",
}

export const getRGB = (color: keyof typeof COLORS, percentage: number = 1) => {
  return `rgba(${COLORS[color]}, ${percentage})`
}
