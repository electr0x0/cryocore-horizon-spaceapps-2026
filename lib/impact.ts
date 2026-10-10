export type AssetKind = 'settlement' | 'farmland' | 'road';
export type DemoAsset = { id: string; name: string; kind: AssetKind; lat: number; lng: number; confidence: number; since: number; value: number; note: string };
export type ImpactFilters = Record<AssetKind, boolean>;
const templates: Omit<DemoAsset, 'lat' | 'lng'>[] = [
  { id: 'north', name: 'Northbank community', kind: 'settlement', confidence: 97, since: 2020, value: 6400, note: 'Illustrative settlement footprint near the change signal.' },
  { id: 'east', name: 'Eastbank community', kind: 'settlement', confidence: 92, since: 2023, value: 3800, note: 'Example exposure added in the later observation period.' },
  { id: 'fields', name: 'Eastern field cluster', kind: 'farmland', confidence: 95, since: 2021, value: 12.6, note: 'Mock agricultural land intersecting the illustrative footprint.' },
  { id: 'southfields', name: 'Southern field cluster', kind: 'farmland', confidence: 83, since: 2024, value: 8.4, note: 'Lower-confidence example for demonstrating review filters.' },
  { id: 'road', name: 'River access corridor', kind: 'road', confidence: 90, since: 2022, value: 7.2, note: 'Illustrative road exposure. No route or accessibility assessment.' },
  { id: 'west', name: 'Westbank community', kind: 'settlement', confidence: 78, since: 2025, value: 2200, note: 'A lower-confidence signal that would need further validation.' }
];
const offsets = [[.09,-.06],[-.05,.1],[.05,.1],[-.12,-.03],[-.04,-.1],[.16,.04]];
export function demoAssets(scenario: { id: string; lat: number; lng: number }): DemoAsset[] { return templates.map((asset, i) => ({ ...asset, id: `${scenario.id}-${asset.id}`, lat: scenario.lat + offsets[i][0], lng: scenario.lng + offsets[i][1], value: scenario.id === 'erosion' ? +(asset.value * .45).toFixed(1) : scenario.id === 'wetland' ? +(asset.value * .7).toFixed(1) : asset.value })); }
export function visibleAssets(assets: DemoAsset[], year: number, confidence: number, filters: ImpactFilters) { return assets.filter(a => a.since <= year && a.confidence >= confidence && filters[a.kind]); }
export const assetUnits = { settlement: 'people', farmland: 'km² farmland', road: 'km road' };
export const assetColors = { settlement: '#f8cf87', farmland: '#8cdaa4', road: '#c4b5fd' };
