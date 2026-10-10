export const presentationSteps = [
  { label: 'Our changing Earth', time: 0, scene: 'landing', scenario: 'flood', tab: 'insights', workspace: 'observe' },
  { label: 'Flood detection', time: 30, scene: 'dashboard', scenario: 'flood', tab: 'insights', workspace: 'observe' },
  { label: 'Inside the radar', time: 60, scene: 'dashboard', scenario: 'flood', tab: 'insights', workspace: 'radar' },
  { label: 'Compare the change', time: 100, scene: 'dashboard', scenario: 'flood', tab: 'compare', workspace: 'observe' },
  { label: 'A shifting river', time: 130, scene: 'dashboard', scenario: 'erosion', tab: 'insights', workspace: 'observe' },
  { label: 'From signals to communities', time: 155, scene: 'dashboard', scenario: 'erosion', tab: 'insights', workspace: 'impact' },
  { label: 'Protecting wetlands', time: 195, scene: 'dashboard', scenario: 'wetland', tab: 'insights', workspace: 'observe' },
  { label: 'One planet. A shared future.', time: 225, scene: 'global', scenario: 'wetland', tab: 'insights', workspace: 'observe' }
] as const;
export type Workspace = 'observe' | 'radar' | 'impact';
