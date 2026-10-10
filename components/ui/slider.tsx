'use client';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
export function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) { return <SliderPrimitive.Root className={cn('slider', className)} {...props}><SliderPrimitive.Track className="slider-track"><SliderPrimitive.Range className="slider-range" /></SliderPrimitive.Track><SliderPrimitive.Thumb className="slider-thumb" aria-label={props['aria-label']} /></SliderPrimitive.Root>; }
