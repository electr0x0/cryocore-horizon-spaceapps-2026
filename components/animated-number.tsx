'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
export function AnimatedNumber({ value, pad = false }: { value: number; pad?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null); const visible = useInView(ref, { once: true }); const [current, setCurrent] = useState(0); const reduced = useReducedMotion();
  useEffect(() => { if (!visible) return; if (reduced) { setCurrent(value); return; } const animation = animate(0, value, { duration: 1.8, ease: 'easeOut', onUpdate: v => setCurrent(Math.round(v)) }); return () => animation.stop(); }, [visible, value, reduced]);
  return <span className="count-value" ref={ref}>{pad ? String(current).padStart(2, '0') : current}</span>;
}
