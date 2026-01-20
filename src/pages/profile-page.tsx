import { Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import BaseField from '@/components/custom/base-field'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h1 className="text-3xl font-bold text-text-primary">Профіль користувача</h1>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar className="w-40 h-40 relative group">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="text-5xl">AA</AvatarFallback>

            <label>
              <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/80 transition-all opacity-[0] group-hover:opacity-[1]">
                <div className="cursor-pointer absolute inset-0 flex items-center justify-center">
                  <div className="">
                    <Upload className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <input type="file" className="hidden" />
            </label>
          </Avatar>
        </div>

        <form className="space-y-6">
          <BaseField
            label="ПІБ"
            name="name"
            type="text"
            placeholder="Прізвище Ім'я По батькові"
            value={''}
            onChange={() => {}}
            required
          />

          <BaseField
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={''}
            onChange={() => {}}
            required
          />

          <BaseField
            label="Телефон"
            name="phone"
            type="tel"
            placeholder="+380 (98) 765-43-21"
            value={''}
            onChange={() => {}}
            required
          />

          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Зміна пароля</h3>
            <p className="text-sm text-text-secondary mb-4">Залиште поля пустими, якщо не хочете змінювати пароль</p>

            <div className="space-y-4">
              <BaseField
                label="Новий пароль"
                name="password"
                type="password"
                placeholder="********"
                value={''}
                onChange={() => {}}
                required
              />
              <BaseField
                label="Підтвердити новий пароль"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={''}
                onChange={() => {}}
                required
              />
            </div>
          </div>

          {/* {updateUser.isError && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{updateUser.error.message}</p>
            </div>
          )} */}

          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="w-full">
              Зберегти зміни
            </Button>
          </div>
        </form>
      </div>

      {/* {user?.is_admin && (
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Адміністратор</p>
              <p className="text-xs text-text-secondary">У вас є права адміністратора</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default ProfilePage
