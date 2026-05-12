export interface Team {
  id: string;
  name: string;
  shortName: string;
  base: string;
  principal: string;
  chassis: string;
  powerUnit: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  standing?: number;
  points?: number;
  wins?: number;
}

export const TEAMS: Team[] = [
  {
    id: 'mclaren', name: 'McLaren F1 Team', shortName: 'McLaren',
    base: 'Woking, UK', principal: 'Andrea Stella',
    chassis: 'MCL40', powerUnit: 'Mercedes',
    primaryColor: '#FF8000', secondaryColor: '#1A1A1A', textColor: '#fff',
    standing: 1, points: 265, wins: 4,
  },
  {
    id: 'ferrari', name: 'Scuderia Ferrari', shortName: 'Ferrari',
    base: 'Maranello, Italy', principal: 'Frédéric Vasseur',
    chassis: 'SF-26', powerUnit: 'Ferrari',
    primaryColor: '#E8002D', secondaryColor: '#FFD700', textColor: '#fff',
    standing: 2, points: 185, wins: 1,
  },
  {
    id: 'red_bull', name: 'Oracle Red Bull Racing', shortName: 'Red Bull',
    base: 'Milton Keynes, UK', principal: 'Christian Horner',
    chassis: 'RB22', powerUnit: 'Honda RBPT',
    primaryColor: '#3671C6', secondaryColor: '#CC1E4A', textColor: '#fff',
    standing: 3, points: 165, wins: 1,
  },
  {
    id: 'mercedes', name: 'Mercedes-AMG Petronas F1', shortName: 'Mercedes',
    base: 'Brackley, UK', principal: 'Toto Wolff',
    chassis: 'W16', powerUnit: 'Mercedes',
    primaryColor: '#27F4D2', secondaryColor: '#1C1C1C', textColor: '#000',
    standing: 4, points: 121, wins: 0,
  },
  {
    id: 'aston_martin', name: 'Aston Martin Aramco F1', shortName: 'Aston Martin',
    base: 'Silverstone, UK', principal: 'Mike Krack',
    chassis: 'AMR26', powerUnit: 'Mercedes',
    primaryColor: '#229971', secondaryColor: '#C7E849', textColor: '#fff',
    standing: 5, points: 67, wins: 0,
  },
  {
    id: 'williams', name: 'Williams Racing', shortName: 'Williams',
    base: 'Grove, UK', principal: 'James Vowles',
    chassis: 'FW47', powerUnit: 'Mercedes',
    primaryColor: '#64C4FF', secondaryColor: '#1C2DC8', textColor: '#fff',
    standing: 6, points: 58, wins: 0,
  },
  {
    id: 'alpine', name: 'BWT Alpine F1 Team', shortName: 'Alpine',
    base: 'Enstone, UK', principal: 'Oliver Oakes',
    chassis: 'A526', powerUnit: 'Renault',
    primaryColor: '#FF87BC', secondaryColor: '#0093CC', textColor: '#fff',
    standing: 7, points: 35, wins: 0,
  },
  {
    id: 'rb', name: 'Visa Cash App RB F1 Team', shortName: 'VCARB',
    base: 'Faenza, Italy', principal: 'Laurent Mekies',
    chassis: 'VCARB 02', powerUnit: 'Honda RBPT',
    primaryColor: '#6692FF', secondaryColor: '#1B4B8B', textColor: '#fff',
    standing: 8, points: 22, wins: 0,
  },
  {
    id: 'haas', name: 'MoneyGram Haas F1 Team', shortName: 'Haas',
    base: 'Kannapolis, USA', principal: 'Ayao Komatsu',
    chassis: 'VF-26', powerUnit: 'Ferrari',
    primaryColor: '#B6BABD', secondaryColor: '#E8002D', textColor: '#000',
    standing: 9, points: 18, wins: 0,
  },
  {
    id: 'sauber', name: 'Stake F1 Team Audi', shortName: 'Audi',
    base: 'Hinwil, Switzerland', principal: 'Mattia Binotto',
    chassis: 'C46', powerUnit: 'Audi',
    primaryColor: '#52E252', secondaryColor: '#000000', textColor: '#000',
    standing: 10, points: 8, wins: 0,
  },
  {
    id: 'cadillac', name: 'Cadillac F1 Team', shortName: 'Cadillac',
    base: 'Fishers, USA', principal: 'Graeme Lowdon',
    chassis: 'CADILLAC01', powerUnit: 'GM',
    primaryColor: '#B09060', secondaryColor: '#0A2472', textColor: '#fff',
    standing: 11, points: 3, wins: 0,
  },
];

export function getTeam(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}
