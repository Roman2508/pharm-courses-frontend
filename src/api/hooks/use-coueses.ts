import { useQuery } from '@tanstack/react-query'

import { axiosClient } from '../client'
import type { CourseType } from '@/types/course.type'

export const useCourses = (status: 'PLANNED' | 'ARCHIVED') => {
  const query = useQuery({
    queryKey: ['courses', { status }],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType[]>(`/course/status/${status}`)
      return data
    },
  })

  return query
}
