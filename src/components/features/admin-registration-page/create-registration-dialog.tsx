import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from "react"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCourses } from "@/api/hooks/use-courses"
import FormField from "@/components/custom/form-field"
import useRegistrationData from "@/hooks/use-registration-data"
import type { UserType } from "@/types/user.type"
import { authClient } from "@/api/auth-client"

interface Props {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const CreateRegistrationDialog: FC<Props> = ({ open, onOpenChange }) => {
  const { data: courses } = useCourses("PLANNED")

  const [users, setUsers] = useState<UserType[]>([])

  const { formData, fields } = useRegistrationData(users, courses)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    //   createCourse.mutate(formData as CourseType, {
    //     onSuccess: () => navigate("/admin/courses"),
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responce = await authClient.admin.listUsers({
          query: { searchValue: "", searchField: "name", searchOperator: "contains" },
        })
        const users = responce.data ? (responce.data.users as UserType[]) : []
        setUsers(users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Нова реєстрація</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          <form className="space-y-6 text-black">
            {fields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                type={field.type}
                label={field.label}
                items={field.items}
                value={field.value}
                fetcher={field.fetcher}
                onChange={field.onChange}
                required={field.required}
                className={field.className}
                defaultValue={field.defaultValue}
              />
            ))}
          </form>
        </DialogDescription>

        <DialogFooter className="w-full gap-2 pt-2">
          <Button size="lg" className="flex-1" onClick={handleSubmit}>
            Створити
          </Button>

          <Button size="lg" variant="ghost" className="w-40" onClick={() => onOpenChange(false)}>
            Закрити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRegistrationDialog
