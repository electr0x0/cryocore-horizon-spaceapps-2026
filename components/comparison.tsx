'use client';
import { useState } from 'react';
import { ChevronsLeftRight, Maximize2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import type { Scenario } from '@/lib/scenarios';
export function Comparison({ scenario, year }: { scenario: Scenario; year: number }) {
  const [position, setPosition] = useState(52);
  const [expanded, setExpanded] = useState(false);
  const backgroundPosition = scenario.id === 'flood' ? '49% 35%' : scenario.id === 'erosion' ? '38% 40%' : '36% 60%';
  return <div className={`comparison ${expanded ? 'comparison-expanded' : ''}`}>
    <div className="compare-image compare-before" style={{ backgroundPosition }} />
    <div className="compare-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><div className="compare-image" style={{ backgroundPosition }} /><svg viewBox="0 0 600 300" preserveAspectRatio="none" className={`change-overlay ${scenario.id}`} style={{ opacity: .25 + (year - 2020) * .125 }}><path d="M240,-10 C310,40 240,80 320,120 S220,170 340,220 S250,280 310,320 L450,320 C380,260 470,240 400,200 S450,140 380,100 S400,30 370,-10Z" fill={scenario.color} fillOpacity=".58" /><path d="M200,90L270,115L235,190L170,150Z M390,120L490,170L430,220L365,180Z" fill={scenario.color} fillOpacity=".35" /></svg></div>
    <span className="image-date before">BEFORE · 2020</span><span className="image-date after">AFTER · {year}</span>
    <button className="compare-expand" aria-label={expanded ? 'Close expanded comparison' : 'Expand comparison'} onClick={() => setExpanded(!expanded)}><Maximize2 size={16} /></button>
    <div className="compare-divider" style={{ left: `${position}%` }}><span><ChevronsLeftRight size={20} /></span></div>
    <input className="compare-drag" type="range" min="5" max="95" value={position} aria-label="Before and after comparison" onChange={e => setPosition(Number(e.target.value))} />
    <div className="compare-footer"><span><i style={{ background: scenario.color }} /> Simulated {scenario.type.toLowerCase()} overlay</span><span>Drag to compare</span></div>
    {expanded && <div className="expanded-control"><Slider aria-label="Expanded comparison position" value={[position]} min={5} max={95} onValueChange={v => setPosition(v[0])} /></div>}
  </div>;
}
