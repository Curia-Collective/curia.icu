import { FilingStatus } from '@/db/schema'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const statusToClass: Record<FilingStatus, string> = {
  pending: 'bg-neutral-500 border-black',
  review: 'bg-yellow-500 border-yellow',
  approved: 'bg-green-500 border-green',
  cancelled: 'bg-red-500 border-red',
}

export const FilingStatusBadge = ({
  status,
  className,
}: {
  status: FilingStatus
  className?: string
}) => {
  return (
    <Badge
      className={cn(
        'border border-white uppercase tracking-wide',
        statusToClass[status],
        className,
      )}
    >
      {status}
    </Badge>
  )
}
