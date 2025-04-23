'use client';

import { Progress } from "@/components/ui/progress";

export const ClientProgress = ({ value }: { value: number }) => (
  <Progress value={value} />
);
