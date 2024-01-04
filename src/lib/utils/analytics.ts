import { track } from '@vercel/analytics';

interface EventProps {
  eventName: string;
  customEvent?: Record<string, any>;
}

export const trackEvent = ({ eventName, customEvent = {} }: EventProps) => {
  track(eventName, customEvent);
};
