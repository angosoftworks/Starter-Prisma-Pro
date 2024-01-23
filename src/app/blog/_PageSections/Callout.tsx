import { cn } from '@/lib/utils/helpers';
import { Info } from 'lucide-react';

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger';
}

export default function Callout({ children, icon, type = 'default', ...props }: CalloutProps) {
  return (
    <div
      className={cn('my-6 flex items-start rounded-md border border-l-4 p-4 bg-gray-100', {
        'border-red-900 bg-red-50': type === 'danger',
        'border-yellow-900 bg-yellow-50': type === 'warning',
        'border-blue-900': type === 'default'
      })}
      {...props}
    >
      {/*{type === 'default' && <Info className="hidden md:block h-6 w-6 mr-4 mt-2" />}*/}
      <div>{children}</div>
    </div>
  );
}
