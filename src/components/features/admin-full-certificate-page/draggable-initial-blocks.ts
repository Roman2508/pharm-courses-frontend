type TextBlockId =
  | "name_position"
  | "course_name_position"
  | "course_date_position"
  | "certificate_number_position"
  | "duration"
  | "points"
  | "year_of_inclusion_to_BPR"
  | "number_of_inclusion_to_BPR"
  | "event_type"
  | "certificate_type"

export interface TextBlock {
  id: TextBlockId
  label: string
  x: number
  y: number
  width: number
  height: number
  fontSize: number
  fontFamily: string
  textAlign: "left" | "center" | "right" | "justify"
  color: string
}

export const DRAGGABLE_INITIAL_BLOCKS: TextBlock[] = [
  {
    id: "name_position",
    label: "ПІБ учасника",
    // x: 50,
    // y: 20,
    x: 435,
    y: 164,
    width: 400,
    height: 40,
    fontSize: 22,
    fontFamily: "Arial",
    textAlign: "center",
    color: "#000000",
  },
  {
    id: "course_name_position",
    label: "Назва заходу",
    // x: 50,
    // y: 80,
    x: 429,
    y: 285,
    width: 400,
    height: 40,
    fontSize: 18,
    fontFamily: "Arial",
    textAlign: "center",
    color: "#000000",
  },
  {
    id: "course_date_position",
    label: "Дата проведення",
    // x: 50,
    // y: 140,
    x: 187,
    y: 443,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "certificate_number_position",
    label: "№ сертифікату",
    // x: 50,
    // y: 180,
    x: 477,
    y: 105,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "duration",
    label: "Тривалість БПР",
    // x: 50,
    // y: 220,
    x: 222,
    y: 43,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "points",
    label: "Балів БПР",
    // x: 50,
    // y: 260,
    x: 218,
    y: 74,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "year_of_inclusion_to_BPR",
    label: "Рік внесення до переліку БПР",
    // x: 50,
    // y: 300,
    x: 271,
    y: 122,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "number_of_inclusion_to_BPR",
    label: "Номер внесення до переліку БПР",
    // x: 50,
    // y: 340,
    x: 166,
    y: 138,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "event_type",
    label: "Тип заходу",
    // x: 50,
    // y: 380,
    x: 559,
    y: 257,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
  {
    id: "certificate_type",
    label: "Тип сертифікату",
    // x: 50,
    // y: 420,
    x: 483,
    y: 75,
    width: 200,
    height: 30,
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "left",
    color: "#000000",
  },
]
