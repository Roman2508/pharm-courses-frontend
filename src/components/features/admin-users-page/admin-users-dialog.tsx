import { useState, type Dispatch, type FC, type SetStateAction } from "react"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { authClient } from "@/api/auth-client"
import useUserData from "@/hooks/use-user-data"
import { Button } from "@/components/ui/button"
import { findError } from "@/helpers/find-error"
import type { UserType } from "@/types/user.type"
import FormField from "@/components/custom/form-field"
import { getFormErrors } from "@/helpers/get-form-errors"
import { userFormSchema } from "./admin-users-form-schema"

interface Props {
  open: boolean
  editedUser: UserType | null
  onOpenChange: Dispatch<SetStateAction<boolean>>
  setEditedUser: Dispatch<SetStateAction<UserType | null>>
}

const AdminUsersDialog: FC<Props> = ({ open, editedUser, onOpenChange, setEditedUser }) => {
  const { fields, formData } = useUserData(editedUser ? editedUser : {})

  const [isPending, setIsPending] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

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

    if (editedUser?.id) {
      try {
        setIsPending(true)
        await authClient.admin.updateUser({ userId: editedUser.id, data: formData })
      } finally {
        setIsPending(false)
      }
    }
  }

  const onDialogClose = () => {
    onOpenChange(false)
    setEditedUser(null)
    useUserData({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Редагувати користувача</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          <form className="space-y-4 text-black">
            {fields.map((field) => (
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
          </form>
        </DialogDescription>

        <DialogFooter className="w-full gap-2 pt-2">
          <Button size="lg" className="flex-1" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Завантаження..." : "Зберегти"}
          </Button>

          <Button size="lg" variant="ghost" className="w-40" disabled={isPending} onClick={onDialogClose}>
            Скасувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AdminUsersDialog
