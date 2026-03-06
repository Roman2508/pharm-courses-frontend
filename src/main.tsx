import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import "./index.css"
import { router } from "./router.tsx"

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)

// TODO:
// Видалення реєстрації з адмінки (спочатку не завантажувати всіх юзерів, а потім зробити пошук по піб)
// Після відправки запиту на безкоштовну участь треба змінити UI в модалці: "Оплата заходу"
// Перевірити підтвердження оплати в <PaymentReceiptDialog />
// В таблиці реєстрацій на сторінці "Всі реєстрації" перевірити чи коректно відображається UI
// Cannot GET /course/user/4

// Перевірити чи не зламалась ревалідація queryKey: ["user-registrations"],
// Перевірити на різних пристроях/емуляторах
// Зробити розбиття по чанкам
