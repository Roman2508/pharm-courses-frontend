const AdminRegistrationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <h1 className="text-3xl font-bold text-text-primary">Всі реєстрації</h1>
        </div>

        {1 > 0 && (
          <div className="flex gap-2">
            <button
              // onClick={() => handleBulkAccess(true)}
              // disabled={bulkToggleCertificates.isPending}
              className="px-4 py-2 rounded-xl bg-success/10 text-success font-medium hover:bg-success/20 transition-colors"
            >
              Відкрити доступ до сертифікатів {/* ({selectedIds.size}) */}
            </button>
            <button
              // onClick={() => handleBulkAccess(false)}
              // disabled={bulkToggleCertificates.isPending}
              className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
            >
              Закрити доступ
            </button>
          </div>
        )}
      </div>

      {false ? (
        <div className="text-center py-12 text-text-secondary">Завантаження реєстрацій...</div>
      ) : 1 > 0 ? (
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-hover">
                  <th className="px-6 py-4 w-12">
                    <input
                      type="checkbox"
                      // onChange={handleSelectAll}
                      // checked={selectedIds.size === registrations.length && registrations.length > 0}
                      className="rounded border-border bg-input text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Студент</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Курс</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Сума</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Статус</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Сертифікат</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Дата</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    user_id: 'User 1',
                    course_id: 'Course 1',
                    amount: 100,
                    payment_status: 'paid',
                    certificate_enabled: true,
                    registered_at: new Date().toISOString(),
                  },
                ].map((reg: any) => (
                  <tr key={reg.id} className="border-b border-border last:border-0 hover:bg-surface-hover/50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        // checked={selectedIds.has(reg.id)}
                        // onChange={() => handleSelectOne(reg.id)}
                        className="rounded border-border bg-input text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary">{reg.user_id}</div>
                      <div className="text-sm text-text-secondary">
                        {/* In real app we resolve user name */}User {reg.user_id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-text-primary">
                        {/* In real app we resolve course name */}Course {reg.course_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-primary">{`formatPrice(reg.amount)`}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                          reg.payment_status === 'paid'
                            ? 'bg-success/10 text-success'
                            : reg.payment_status === 'failed'
                              ? 'bg-destructive/10 text-destructive'
                              : 'bg-secondary/10 text-secondary'
                        }`}
                      >
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        // onClick={() => toggleCertificate.mutate({ id: reg.id, enabled: !reg.certificate_enabled })}
                        // disabled={toggleCertificate.isPending}
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          reg.certificate_enabled
                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                            : 'bg-surface-hover text-text-secondary hover:bg-border'
                        }`}
                      >
                        {reg.certificate_enabled ? 'Доступно' : 'Немає доступу'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{`formatDateTime(reg.registered_at)`}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-surface rounded-2xl border border-border">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-surface-hover mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Немає реєстрацій</h3>
            <p className="text-text-secondary">Реєстрації з'являться тут, коли студенти запишуться на заходи.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRegistrationsPage
