import { Link } from 'react-router'

import { Button } from '@/components/ui/button'

const AdminCoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <h1 className="text-3xl font-bold text-text-primary">Управління курсами</h1>
        </div>
        <Link
          to="/admin/courses/new"
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          Створити курс
        </Link>
      </div>

      {false ? (
        <div className="text-center py-12 text-text-secondary">Завантаження курсів...</div>
      ) : 1 > 0 ? (
        <div className="space-y-4">
          {[
            {
              id: 1,
              name: 'Course 1',
              status: 'open',
              registration_open: true,
              start_date: '2022-01-01',
              end_date: '2022-01-02',
              price: 100,
              program: 'Program 1',
            },
            {
              id: 1,
              name: 'Course 1',
              status: 'open',
              registration_open: true,
              start_date: '2022-01-01',
              end_date: '2022-01-02',
              price: 100,
              program: 'Program 1',
            },
          ].map((course) => (
            <div key={course.id} className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-text-primary">{course.name}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                        course.status === 'open'
                          ? 'bg-success/10 text-success'
                          : course.status === 'upcoming'
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-text-muted/10 text-text-muted'
                      }`}
                    >
                      {course.status}
                    </span>
                    {!course.registration_open && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-destructive/10 text-destructive">
                        Закрито
                      </span>
                    )}
                  </div>
                  {/* <p className="text-sm font-medium text-secondary mb-2">{course.program}</p> */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                    <span>
                      {`{formatDate(course.start_date)}`}
                      {course.end_date && course.end_date !== course.start_date && (
                        <> - {`{formatDate(course.end_date)}`}</>
                      )}
                    </span>
                    <span className="font-semibold text-primary">{`{formatPrice(course.price)}`}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/admin/courses/${course.id}`}>
                    <Button variant="primary">Редагувати</Button>
                  </Link>

                  <Link to={`/admin/courses/${course.id}/registrations`}>
                    <Button variant="secondary">Реєстрації</Button>
                  </Link>

                  <Button variant="destructive">Видалити</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-surface mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Курсів ще немає</h3>
            <p className="text-text-secondary mb-6">Створіть свій перший курс, щоб почати.</p>
            <Link
              to="/admin/courses/new"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Створити курс
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCoursesPage
