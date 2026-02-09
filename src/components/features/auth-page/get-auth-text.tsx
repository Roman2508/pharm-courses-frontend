import type { AuthPageVariants } from "@/pages/auth-page"

export const getAuthTitle = (authType: AuthPageVariants) => {
  switch (authType) {
    case "login":
      return "Ласкаво просимо"
    case "register":
      return "Створити акаунт"
    case "verify-email":
      return "Підтвердження пошти"
    case "verified":
      return "Пошту підтверджено"
  }
}

export const getAuthText = (authType: AuthPageVariants) => {
  switch (authType) {
    case "login":
      return "Увійдіть до свого облікового запису"
    case "register":
      return "Зареєструйтесь для доступу до наших заходів"
    case "verify-email":
      return (
        <div className="flex flex-col space-y-2 text-justify">
          <p>Ми надіслали лист із посиланням для підтвердження на адресу, яку ви вказали під час реєстрації.</p>
          <p>Щоб завершити створення облікового запису, перейдіть за посиланням у цьому листі.</p>
          <p>Якщо ви не бачите листа у вхідних, перевірте папку «Спам»</p>
        </div>
      )
    case "verified":
      return (
        <div className="flex flex-col space-y-2 text-justify">
          <p>Тепер ви можете увійти в свій обліковий запис і почати користуватися платформою.</p>
          <p>Натисніть кнопку нижче, щоб продовжити.</p>
        </div>
      )
  }
}
