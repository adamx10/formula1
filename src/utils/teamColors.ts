export const TEAM_COLORS: Record<string, { primary: string; secondary: string }> = {
  red_bull:        { primary: '#3671C6', secondary: '#CC1E4A' },
  ferrari:         { primary: '#E8002D', secondary: '#FFCC00' },
  mercedes:        { primary: '#27F4D2', secondary: '#1C1C1C' },
  mclaren:         { primary: '#FF8000', secondary: '#1A1A1A' },
  aston_martin:    { primary: '#229971', secondary: '#C7E849' },
  alpine:          { primary: '#FF87BC', secondary: '#0093CC' },
  williams:        { primary: '#64C4FF', secondary: '#1C2DC8' },
  rb:              { primary: '#6692FF', secondary: '#1B4B8B' },
  sauber:          { primary: '#52E252', secondary: '#000000' },
  haas:            { primary: '#B6BABD', secondary: '#E8002D' },
  cadillac:        { primary: '#B09060', secondary: '#0A2472' },
  // Legacy / fallback
  renault:         { primary: '#FFF500', secondary: '#000000' },
  force_india:     { primary: '#FF80C7', secondary: '#FF5F0F' },
  racing_point:    { primary: '#F596C8', secondary: '#2B67AF' },
  toro_rosso:      { primary: '#469BFF', secondary: '#CC1E4A' },
  alfa:            { primary: '#C92D4B', secondary: '#FFFFFF' },
};

export function getTeamColors(constructorId: string) {
  return TEAM_COLORS[constructorId] ?? { primary: '#6B7280', secondary: '#374151' };
}

export function getTeamBgStyle(constructorId: string): React.CSSProperties {
  const { primary } = getTeamColors(constructorId);
  return { borderLeftColor: primary };
}
