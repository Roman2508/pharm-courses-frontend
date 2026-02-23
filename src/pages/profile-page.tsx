import { toast } from "sonner"
import { useState } from "react"
import { Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import useUserData from "@/hooks/use-user-data"
import { Button } from "@/components/ui/button"
import { findError } from "@/helpers/find-error"
import type { UserType } from "@/types/user.type"
import FormField from "@/components/custom/form-field"
import { useUpdateAvatar } from "@/api/hooks/use-user"
import { getFormErrors } from "@/helpers/get-form-errors"
import { authClient, useSession } from "@/api/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateUserSchema } from "@/components/features/admin-users-page/admin-users-form-schema"

const ProfilePage = () => {
  const { data } = useSession()

  const [deleteInput, setDeleteInput] = useState("")

  const { fields, formData } = useUserData(data?.user ? (data.user as unknown as UserType) : null)

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
    const res = updateUserSchema.safeParse(formData)
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
        const isEmailChange = data.user.email !== formData.email

        const { email, password, oldPassword, role, ...rest } = formData

        if (isEmailChange) {
          const { data } = await authClient.updateUser(rest)
          await authClient.changeEmail({ newEmail: formData.email })
          if (data?.status) toast.success("Профіль оновлено")
          else toast.error("Сталась помилка під час оновлення профілю")
        } else {
          const { data } = await authClient.updateUser(rest)
          if (data?.status) toast.success("Профіль оновлено")
          else toast.error("Сталась помилка під час оновлення профілю")
        }

        if (password && password !== "" && oldPassword && oldPassword !== "") {
          const data = await authClient.changePassword({ currentPassword: oldPassword, newPassword: password })

          if (data?.error) {
            if (data.error.code === "INVALID_PASSWORD") toast.error("Поточний пароль введено не вірно")
            else toast.error("Сталась помилка під час зміни паролю")
          } else toast.success("Пароль змінено")
        }
      } finally {
        setIsPending(false)
      }
    }
  }

  const handleDelete = () => {
    if (
      !window.confirm(
        "Ви впевнені, що хочете видалити свій обліковий запис та всі пов'язані з ним дані? Цю дію не можна відмінити",
      )
    )
      return
    authClient.deleteUser()
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h1 className="text-3xl font-bold text-text-primary">Профіль</h1>
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
          <p className="text-sm opacity-[0.7]">*Натисніть на свій аватар щоб змінити його</p>
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

      <div className="bg-surface rounded-2xl border border-border p-8 mt-4">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Видалити профіль</h2>
        <p className="text-base text-text-secondary mb-2">
          Ця дія назавжди видалить ваш профіль, включно з реєстраціями, курсами та сертифікатами.
        </p>

        <div className="mt-2">
          <b className="text-base text-text-secondary">Введіть "Видалити", щоб розблокувати цю дію.</b>
        </div>

        <Input
          type="text"
          placeholder="Слово підтвердження"
          className="mt-2 mb-4"
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
        />

        <Button
          size="lg"
          className="w-full"
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteInput.toLowerCase() !== "видалити"}
        >
          Видалити
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage
