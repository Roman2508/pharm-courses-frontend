import { toast } from "sonner"
import { useState } from "react"
import { Upload } from "lucide-react"

import useUserData from "@/hooks/use-user-data"
import { Button } from "@/components/ui/button"
import { findError } from "@/helpers/find-error"
import type { UserType } from "@/types/user.type"
import FormField from "@/components/custom/form-field"
import { useUpdateAvatar } from "@/api/hooks/use-user"
import { getFormErrors } from "@/helpers/get-form-errors"
import { authClient, useSession } from "@/api/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userFormSchema } from "@/components/features/admin-users-page/admin-users-form-schema"

const ProfilePage = () => {
  const { data } = useSession()

  const { fields, formData } = useUserData(data?.user ? (data.user as Partial<UserType> | undefined) : {})

  const availableFields = fields.filter((field) => field.name !== "role")

  const [isPending, setIsPending] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const updateAvatar = useUpdateAvatar()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("avatar", file)
    updateAvatar.mutate(formData, {
      onSuccess: () => {
        setPreview(URL.createObjectURL(file))
      },
    })
  }

  const validate = () => {
    const res = userFormSchema.safeParse(formData)
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validate()
    if (errors) {
      setShowErrors(true)
      return
    }

    if (data?.user?.id) {
      try {
        setIsPending(true)
        const isEmailChange = data.user.email === formData.email

        if (isEmailChange) {
          const { email, role, ...rest } = formData
          const { data } = await authClient.updateUser(rest)
          if (data?.status) toast.success("Профіль оновлено")
          else toast.error("Сталась помилка під час оновлення профілю")
        } else {
          const { role, ...rest } = formData
          const { data } = await authClient.updateUser(rest)
          if (data?.status) toast.success("Профіль оновлено")
          else toast.error("Сталась помилка під час оновлення профілю")
        }
      } finally {
        setIsPending(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h1 className="text-3xl font-bold text-text-primary">Профіль користувача</h1>
      </div>

      {data?.user?.role === "admin" && (
        <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
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
      )}

      <div className="bg-surface rounded-2xl border border-border p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar className="w-40 h-40 relative group">
            <AvatarImage
              src={preview || `${import.meta.env.VITE_BASE_URL}${data?.user?.image}` || ""}
              alt="profile avarar"
            />
            <AvatarFallback className="text-5xl">AA</AvatarFallback>

            <label>
              <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/80 transition-all opacity-[0] group-hover:opacity-[1]">
                <div className="cursor-pointer absolute inset-0 flex items-center justify-center">
                  <div className="">
                    <Upload className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </Avatar>
        </div>

        <form className="space-y-6">
          {availableFields.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              items={field.items}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className={field.className}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              error={findError(field.name, errors)}
            />
          ))}

          {showErrors && !!getFormErrors(errors).length && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              {getFormErrors(errors).map((error) => (
                <p className="text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button size="lg" className="flex-1" disabled={isPending} onClick={handleSubmit}>
              {isPending ? "Завантаження..." : "Зберегти зміни"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage

{
  /* <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Зміна пароля</h3>
            <p className="text-sm text-text-secondary mb-4">Залиште поля пустими, якщо не хочете змінювати пароль</p>

            <div className="space-y-4">
              <FormField
                label="Новий пароль"
                name="password"
                type="password"
                placeholder="********"
                value={""}
                onChange={() => {}}
                required
              />
              <FormField
                label="Підтвердити новий пароль"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={""}
                onChange={() => {}}
                required
              />
            </div>
          </div> */
}
