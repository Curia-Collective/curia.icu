import { FilingStatus } from '@/db/schema'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const statusToClass: Record<FilingStatus, string> = {
  pending: 'bg-silver border-black',
  review: 'bg-yellow border-yellow',
  approved: 'bg-green border-green',
  cancelled: 'bg-red border-red',
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
