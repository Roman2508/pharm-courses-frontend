import { Title } from "@/components/custom/title"

const institution = "Житомирський базовий фармацевтичний фаховий коледж Житомирської обласної ради"
const email = "collage@pharm.zt.ua"
const phone = "+380 67 123 45 67"

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Title className="mb-10">Політика конфіденційності</Title>

      <div className="space-y-8 leading-relaxed mb-10">
        {/* 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Загальні положення</h2>
          <p>
            Ця Політика конфіденційності визначає порядок збору, використання, зберігання та захисту персональних даних
            користувачів вебсайту {institution} (далі — Сайт).
          </p>
          <p>
            {institution} поважає право кожного учасника заходів БПР на захист персональних даних та забезпечуємо їх
            обробку відповідно до вимог чинного законодавства України.
          </p>
          <p>Користуючись Сайтом та надаючи свої персональні дані, Ви підтверджуєте згоду з умовами цієї Політики.</p>
        </section>

        {/* 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Розпорядник персональних даних</h2>
          <p>
            Розпорядником персональних даних є: <b>{institution}</b>.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Які персональні дані ми збираємо</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>прізвище, ім’я, по батькові (ПІБ);</li>
            <li>контактний номер телефону;</li>
            <li>адреса електронної пошти (email);</li>
            <li>місце роботи та спеціальність;</li>
            <li>інші дані, необхідні для участі у заходах БПР та оформлення сертифікатів.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Мета обробки персональних даних</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>реєстрації користувачів на Сайті;</li>
            <li>реєстрації на заходи;</li>
            <li>комунікації з учасниками;</li>
            <li>оформлення сертифікатів БПР;</li>
            <li>виконання вимог чинного законодавства;</li>
            <li>покращення якості сервісу.</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Правові підстави обробки</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>добровільна згода користувача;</li>
            <li>виконання договору про надання освітніх послуг;</li>
            <li>вимоги законодавства України.</li>
          </ul>
        </section>

        {/* 6 */}
        {/* <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Порядок використання та зберігання даних</h2>
          <p>
            Персональні дані використовуються лише для визначених цілей, не передаються стороннім особам без законних
            підстав та зберігаються у захищених інформаційних системах із застосуванням організаційних та технічних
            заходів безпеки.
          </p>
        </section> */}

        {/* 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Передача персональних даних третім особам</h2>
          <p>
            Сайт не передає персональні дані третім особам, за винятком випадків, передбачених законодавством України
            або необхідних для організації заходів (Державне некомерційне товариство «Центр якості освіти Міністерства
            охорони здоров`я України»).
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Cookies та технічні дані</h2>
          <p>
            Сайт використовує cookies для авторизації, забезпечення безпечної роботи та збереження налаштувань.
            Обмеження cookies може вплинути на функціональність Сайту.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Права користувача</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>отримувати інформацію про свої персональні дані;</li>
            <li>вимагати виправлення або оновлення;</li>
            <li>вимагати видалення або обмеження обробки;</li>
            <li>відкликати згоду на обробку;</li>
            <li>звертатися до уповноважених органів або до суду.</li>
          </ul>
        </section>

        {/* 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Захист персональних даних</h2>
          <p>
            Сайт вживає необхідних організаційних та технічних заходів для захисту персональних даних від
            несанкціонованого доступу, втрати, знищення або розголошення.
          </p>
        </section>

        {/* 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Зміни до Політики</h2>
          <p>
            Актуальна версія Політики завжди публікується на Сайті. Продовження користування Сайтом означає згоду з
            оновленими умовами.
          </p>
        </section>

        {/* 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. Контактна інформація</h2>
          <p>
            <b>{institution}</b>
          </p>
          <p>Email: {email}</p>
          <p>Телефон: {phone}</p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
