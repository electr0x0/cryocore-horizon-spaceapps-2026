'use client';
import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Polygon, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Scenario } from '@/lib/scenarios';
import { assetColors, assetUnits, type DemoAsset } from '@/lib/impact';
const bounds: [[number, number], [number, number]] = [[16.636, 84.375], [29.535, 98.4375]];
function Camera({ scenario, global, cameraTick, assets, selectedAsset }: { scenario: Scenario; global: boolean; cameraTick: number; assets?: DemoAsset[]; selectedAsset?: string | null }) { const map = useMap(); useEffect(() => { const focus = assets?.find(a=>a.id===selectedAsset); const center: [number, number] = global ? [20, 40] : focus ? [focus.lat,focus.lng] : [scenario.lat, scenario.lng]; const zoom = global ? 2 : focus ? 9 : scenario.zoom; if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) map.setView(center, zoom); else map.flyTo(center, zoom, { duration: 1.5 }); }, [map, scenario, global, cameraTick, assets, selectedAsset]); return null; }
export default function EarthMap({ scenario, year, layers, global, cameraTick, onSelect, assets, selectedAsset, onAssetSelect }: { scenario: Scenario; year: number; layers: { detections: boolean; labels: boolean; satellite: boolean }; global: boolean; cameraTick: number; onSelect: (id: string) => void; assets?: DemoAsset[]; selectedAsset?: string | null; onAssetSelect?: (id:string)=>void }) {
  const scale = Math.sqrt(scenario.years[year - 2020] / scenario.area);
  const shape = scenario.polygon.map(([lat, lng]) => [scenario.lat + (lat - scenario.lat) * scale, scenario.lng + (lng - scenario.lng) * scale] as [number, number]);
  return <MapContainer center={[24.4, 90.3]} zoom={7} minZoom={2} maxZoom={10} maxBounds={[[-85, -180], [85, 180]]} maxBoundsViscosity={.8} zoomControl={false} scrollWheelZoom={true} className="earth-map" attributionControl={true}>
    <Camera scenario={scenario} global={global} cameraTick={cameraTick} assets={assets} selectedAsset={selectedAsset} />
    {assets?.map(asset=><CircleMarker key={asset.id} center={[asset.lat,asset.lng]} radius={selectedAsset===asset.id?13:8} pathOptions={{color:assetColors[asset.kind],fillColor:assetColors[asset.kind],fillOpacity:.75,weight:2,className:'impact-marker'}} eventHandlers={{click:()=>onAssetSelect?.(asset.id)}}><Popup><strong>{asset.name}</strong><br/>{asset.value} {assetUnits[asset.kind]} · {asset.confidence}%<br/>Fictional demo asset</Popup></CircleMarker>)}
    <ImageOverlay url="/images/earth-mercator.jpg" bounds={[[-85.051129, -180], [85.051129, 180]]} opacity={layers.satellite ? .52 : .12} attribution="Earth: NASA Blue Marble" />
    <ImageOverlay url="/images/bangladesh.jpg" bounds={bounds} opacity={layers.satellite ? .94 : .2} attribution="Imagery © Esri, Maxar, Earthstar Geographics" />
    {layers.detections && !global && <Polygon positions={shape} pathOptions={{ color: scenario.color, fillColor: scenario.color, fillOpacity: .32, weight: 2, dashArray: '5 6' }} />}
    {!global && [{ id: 'flood', lat: 24.93, lng: 91.25, name: 'SUNAMGANJ', color: '#44d9ee' }, { id: 'erosion', lat: 24.45, lng: 89.72, name: 'SIRAJGANJ', color: '#ffa768' }, { id: 'wetland', lat: 22, lng: 89.5, name: 'SUNDARBANS', color: '#8cdaa4' }].map(p => <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={scenario.id === p.id ? 10 : 6} pathOptions={{ color: p.color, fillColor: p.color, fillOpacity: 1, weight: 3, className: 'animated-marker' }} eventHandlers={{ click: () => onSelect(p.id) }}><Popup><strong>{p.name}</strong><br />Simulated monitoring location</Popup></CircleMarker>)}
    {global && [{ p: [-3.1,-60] as [number,number], name: 'Amazon Basin' }, { p: [10,105.8] as [number,number], name: 'Mekong Delta' }, { p: [30.9,31.2] as [number,number], name: 'Nile Delta' }, { p: [24,90] as [number,number], name: 'Bangladesh' }].map(p => <CircleMarker key={p.name} center={p.p} radius={8} pathOptions={{ color: '#44d9ee', fillOpacity: .8 }}><Popup>{p.name}<br />Illustrative global monitoring location</Popup></CircleMarker>)}
    {layers.labels && !global && <><CircleMarker center={[23.81,90.41]} radius={3} pathOptions={{ color:'#fff' }}><Popup>Dhaka</Popup></CircleMarker><Polygon positions={[[26.4,88.4],[25.3,89.9],[25.2,92.2],[23.8,91.2],[22.1,92.6],[21.7,89.1],[23.7,88.6],[24.8,88.0]]} pathOptions={{ color: '#e4f6f3', weight: 1, fillOpacity: 0, dashArray: '3 8', opacity: .45 }} /></>}
    <ZoomControl position="bottomleft" />
  </MapContainer>;
}
