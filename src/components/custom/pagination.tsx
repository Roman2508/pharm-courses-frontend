import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  PaginationItem,
  PaginationLink,
  PaginationContent,
  Pagination as ShadPagination,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type PaginationProps<QueryType extends Record<string, any>> = {
  total: number // загальна к-ть елементів
  page: number // поточна сторінка
  limit: number // к-ть елементів на сторінці
  handleChangeParams: (key: keyof QueryType, value: any) => void
  limitOptions?: number[]
}

export const Pagination = <QueryType extends Record<string, any>>({
  total,
  page,
  limit,
  handleChangeParams,
  limitOptions = [10, 20, 50, 100],
}: PaginationProps<QueryType>) => {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  const goLast = () => {
    if (page > 1) {
      handleChangeParams("page" as keyof QueryType, page - 1)
    }
  }

  const goNext = () => {
    if (page < totalPages) {
      handleChangeParams("page" as keyof QueryType, page + 1)
    }
  }

  const changeLimit = (newLimit: number) => {
    handleChangeParams("limit" as keyof QueryType, newLimit)
    handleChangeParams("page" as keyof QueryType, 1)
  }

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <ShadPagination>
        <PaginationContent className="gap-2">
          <PaginationItem onClick={goLast} className="bg-input border border-border rounded-lg">
            <PaginationLink href="#" aria-label="Go to previous page">
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem className="border border-border h-9 rounded-lg flex items-center px-4 bg-input select-none">
            <p className="text-muted-foreground text-sm truncate" aria-live="polite">
              Сторінка <span className="text-foreground">{page}</span> з{" "}
              <span className="text-foreground">{totalPages}</span>
            </p>
          </PaginationItem>

          <PaginationItem onClick={goNext} className="bg-input border border-border rounded-lg">
            <PaginationLink href="#" aria-label="Go to next page">
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>

      <Select defaultValue={String(limit)} onValueChange={(count) => changeLimit(Number(count))}>
        <SelectTrigger className="w-20 min-[400px]:w-30 !h-9">
          <SelectValue placeholder="На сторінці" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {limitOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
