import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const AdminUsersPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Редагувати користувача</DialogTitle>
          </DialogHeader>

          <form /* onSubmit={handleSubmit} */ className="space-y-4">
            <div>
              <label htmlFor="edit_full_name" className="block text-sm font-medium text-text-primary mb-2">
                Повне ім'я
              </label>
              <input
                id="edit_full_name"
                type="text"
                required
                // value={formData.full_name}
                // onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="edit_email" className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                id="edit_email"
                type="email"
                required
                // value={formData.email}
                // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="edit_phone" className="block text-sm font-medium text-text-primary mb-2">
                Телефон
              </label>
              <input
                id="edit_phone"
                type="tel"
                // value={formData.phone}
                // onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+380 123 456 789"
              />
            </div>

            <div>
              <label htmlFor="edit_password" className="block text-sm font-medium text-text-primary mb-2">
                Новий пароль (необов'язково)
              </label>
              <input
                id="edit_password"
                type="password"
                // value={formData.password}
                // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Залиште пустим, щоб не змінювати"
              />
            </div>

            {/* {updateUser.isError && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{updateUser.error.message}</p>
              </div>
            )} */}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                // disabled={updateUser.isPending}
                className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* {updateUser.isPending ? "Збереження..." : "Зберегти"} */}
                Зберегти
              </button>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="px-6 py-3 rounded-xl bg-surface-hover text-text-secondary font-medium hover:bg-border transition-colors"
              >
                Скасувати
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
          <h1 className="text-3xl font-bold text-text-primary">Управління користувачами</h1>
        </div>

        {false ? (
          <div className="text-center py-24">
            <p className="text-text-secondary">Завантаження...</p>
          </div>
        ) : 1 > 0 ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-hover">
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Ім'я</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Телефон</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Роль</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      id: 1,
                      full_name: 'John Doe',
                      email: 'john.doe@example.com',
                      phone: '123-456-7890',
                      is_admin: true,
                    },
                  ].map((user) => (
                    <tr key={user.id} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text-primary">{user.full_name || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{user.phone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_admin ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Адміністратор
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                            Користувач
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          // onClick={() => handleEdit(user)}
                          onClick={() => setIsDialogOpen(true)}
                          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          Редагувати
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-text-secondary">Користувачів не знайдено</p>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminUsersPage
