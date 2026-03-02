// RGB colors
export const COLORS = {
  primary: "15, 116, 197",
  secondary: "0, 175, 167",
  success: "58, 151, 66",
  destructive: "231, 0, 11",
  white: "255, 255, 255",
  border: "222, 222, 222",
  muted: "245, 245, 245",
  "surface-hover": "245, 245, 245",
  background: "252, 252, 252",
  "text-muted": "128, 128, 128",
  accent: "245, 245, 245",
  input: "238, 238, 238",
  black: "0, 0, 0",
  ring: "15, 116, 197",
  surface: "255, 255, 255",
}

export const getRGB = (color: keyof typeof COLORS, percentage: number = 1) => {
  return `rgba(${COLORS[color]}, ${percentage})`
}
