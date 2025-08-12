import type { Team } from '~/types'

export const TEAMS: Team[] = [
  {
    id: 'gll',
    name: 'Green Light Legends',
    abbreviation: 'GLL',
    division: 'Central',
    coach: 'Mike Johnson',
    established: '2020',
    homeField: 'Legend Park',
    primaryColor: '#3BFF42',
    secondaryColor: '#071000'
  },
  {
    id: 'rcr',
    name: 'River City Raptors',
    abbreviation: 'RCR',
    division: 'East',
    coach: 'Sarah Chen',
    established: '2018',
    homeField: 'Riverside Stadium',
    primaryColor: '#FF3E1B',
    secondaryColor: '#023609'
  },
  {
    id: 'cc',
    name: 'Coastal Crushers',
    abbreviation: 'CC',
    division: 'West',
    coach: 'Tom Martinez',
    established: '2019',
    homeField: 'Ocean View Field',
    primaryColor: '#558200',
    secondaryColor: '#0B1A00'
  },
  {
    id: 'mm',
    name: 'Mountain Miners',
    abbreviation: 'MM',
    division: 'North',
    coach: 'Emily Wilson',
    established: '2017',
    homeField: 'Peak Diamond',
    primaryColor: '#FFFEEB',
    secondaryColor: '#071000'
  },
  {
    id: 'dd',
    name: 'Desert Diamondbacks',
    abbreviation: 'DD',
    division: 'South',
    coach: 'Demo Coach',
    established: '2021',
    homeField: 'Sand Box Arena',
    primaryColor: '#E7FFD7',
    secondaryColor: '#023609'
  },
  {
    id: 'ccc',
    name: 'Capital City Captains',
    abbreviation: 'CCC',
    division: 'Central',
    coach: 'Alex Thompson',
    established: '2016',
    homeField: 'Capitol Field',
    primaryColor: '#3BFF42',
    secondaryColor: '#000000'
  },
  {
    id: 'hh',
    name: 'Harbor Hawks',
    abbreviation: 'HH',
    division: 'East',
    coach: 'Jordan Lee',
    established: '2020',
    homeField: 'Harbor Stadium',
    primaryColor: '#FF3E1B',
    secondaryColor: '#FFFFFF'
  },
  {
    id: 'pp',
    name: 'Prairie Pioneers',
    abbreviation: 'PP',
    division: 'West',
    coach: 'Chris Anderson',
    established: '2018',
    homeField: 'Prairie Grounds',
    primaryColor: '#558200',
    secondaryColor: '#FFFEEB'
  },
  {
    id: 'scs',
    name: 'Steel City Sluggers',
    abbreviation: 'SCS',
    division: 'North',
    coach: 'Pat Murphy',
    established: '2019',
    homeField: 'Steel Park',
    primaryColor: '#023609',
    secondaryColor: '#E7FFD7'
  },
  {
    id: 'bab',
    name: 'Bay Area Barnstormers',
    abbreviation: 'BAB',
    division: 'West',
    coach: 'Jamie Rodriguez',
    established: '2017',
    homeField: 'Bay Diamond',
    primaryColor: '#0B1A00',
    secondaryColor: '#3BFF42'
  }
]

export function getTeamById(id: string): Team | undefined {
  return TEAMS.find(team => team.id === id)
}

export function getTeamsByDivision(division: string): Team[] {
  return TEAMS.filter(team => team.division === division)
}