import { toast } from "sonner"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import useUserData from "@/hooks/use-user-data"
import { Button } from "@/components/ui/button"
import { findError } from "@/helpers/find-error"
import type { UserType } from "@/types/user.type"
import FormField from "@/components/custom/form-field"
import { getFormErrors } from "@/helpers/get-form-errors"
import { authClient, useSession } from "@/api/auth-client"
import { createUserSchema, updateUserSchema } from "./admin-users-form-schema"

interface Props {
  open: boolean
  isAdminPage?: boolean
  disabledFields?: string[]
  editedUser: UserType | null
  onOpenChange: Dispatch<SetStateAction<boolean>>
  setEditedUser: Dispatch<SetStateAction<UserType | null>>
}

const AdminUsersDialog: FC<Props> = ({
  open,
  editedUser,
  onOpenChange,
  setEditedUser,
  disabledFields,
  isAdminPage = false,
}) => {
  const { data } = useSession()

  const { fields, formData } = useUserData(editedUser)

  const availableFields = fields.filter((field) => {
    if (data?.user.id === editedUser?.id) {
      if (field.name)
        if (disabledFields && disabledFields.includes(field.name)) {
          return false
        }
    }
    return field
  })

  const [isPending, setIsPending] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const validate = () => {
    let res
    if (editedUser) {
      res = updateUserSchema.safeParse(formData)
    } else {
      res = createUserSchema.safeParse(formData)
    }
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const errors = validate()
  //   if (errors) {
  //     setShowErrors(true)
  //     return
  //   }

  //   try {
  //     setIsPending(true)

  //     if (editedUser?.id) {
  //       if (editedUser?.id === data?.user.id) {
  //         const { email, password, oldPassword, role, ...rest } = formData
  //         await authClient.updateUser(rest)
  //         toast.success("Профіль оновлено")
  //         onDialogClose()
  //         return
  //       }

  //       await authClient.admin.updateUser({ userId: editedUser.id, data: formData })
  //       onDialogClose()
  //     } else {
  //       const { email, password, name, ...data } = formData
  //       if (password) {
  //         await authClient.admin.createUser({ email, password, name, data })
  //         onDialogClose()
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Сталася помилка при збереженні користувача")
  //   } finally {
  //     setIsPending(false)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validate()
    if (errors) {
      setShowErrors(true)
      return
    }

    const isEditMode = Boolean(editedUser?.id)
    const isCurrentUser = editedUser?.id === data?.user.id

    try {
      setIsPending(true)

      if (isEditMode && isCurrentUser) {
        const { email, password, oldPassword, role, ...profileData } = formData
        await authClient.updateUser(profileData)
        toast.success("Профіль оновлено")
        //
      } else if (isEditMode) {
        await authClient.admin.updateUser({ userId: editedUser!.id, data: formData })
        //
      } else if (formData.password) {
        const { email, password, name, ...rest } = formData
        await authClient.admin.createUser({ email, password, name, data: rest })
      }

      onDialogClose()
    } catch (error) {
      console.log("Error saving user:", error)
      toast.error("Сталася помилка при збереженні користувача")
    } finally {
      setIsPending(false)
    }
  }

  const onDialogClose = () => {
    onOpenChange(false)
    setEditedUser(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] pl-2 pr-0 min-[500px]:px-6">
        <DialogHeader className="pb-4">
          {
            <DialogTitle>
              {isAdminPage
                ? editedUser
                  ? "Редагувати користувача"
                  : "Створити користувача"
                : "Заповніть свій профіль"}
            </DialogTitle>
          }
          {!isAdminPage && (
            <DialogDescription className="mt-2">
              Для реєстрації в заході вам потрібно заповнити додаткову інформацію в полях нижче
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          <form className="space-y-4 text-black">
            {availableFields.map((field) => {
              let label = field.label
              let placeholder = field.placeholder
              let required = field.required

              if (field.name === "password" && !editedUser) {
                label = "Пароль"
                placeholder = ""
                required = true
              }

              return (
                <FormField
                  label={label}
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  items={field.items}
                  value={field.value}
                  required={required}
                  placeholder={placeholder}
                  onChange={field.onChange}
                  className={field.className}
                  defaultValue={field.defaultValue}
                  error={findError(field.name, errors)}
                />
              )
            })}

            {showErrors && !!getFormErrors(errors).length && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                {getFormErrors(errors).map((error) => (
                  <p className="text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form>
        </DialogDescription>

        <DialogFooter className="w-full flex-row gap-2 pt-4">
          <Button size="lg" className="flex-1" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Завантаження..." : "Зберегти"}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="flex-1 min-[500px]:w-40"
            disabled={isPending}
            onClick={onDialogClose}
          >
            Скасувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdminUsersDialog
