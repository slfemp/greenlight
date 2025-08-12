import type { Player, PlayerGameStat } from '~/types'
import { TEAMS } from '../data/teams'

const statuses: Player['status'][] = ['green', 'yellow', 'red']
const positions = ['Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Left Field', 'Center Field', 'Right Field']

// Predefined stats for consistency - using December 2024 dates
const baseStats: PlayerGameStat[] = [
  { date: '2024-12-02T00:00:00.000Z', pitchCount: 85, pitchesPerInning: 14, inningsPitched: 6, restDays: 2 },
  { date: '2024-12-05T00:00:00.000Z', pitchCount: 92, pitchesPerInning: 15, inningsPitched: 6, restDays: 3 },
  { date: '2024-12-08T00:00:00.000Z', pitchCount: 78, pitchesPerInning: 13, inningsPitched: 6, restDays: 3 },
  { date: '2024-12-11T00:00:00.000Z', pitchCount: 95, pitchesPerInning: 19, inningsPitched: 5, restDays: 3 },
  { date: '2024-12-14T00:00:00.000Z', pitchCount: 72, pitchesPerInning: 12, inningsPitched: 6, restDays: 3 },
  { date: '2024-12-17T00:00:00.000Z', pitchCount: 88, pitchesPerInning: 14, inningsPitched: 6, restDays: 3 },
  { date: '2024-12-20T00:00:00.000Z', pitchCount: 101, pitchesPerInning: 20, inningsPitched: 5, restDays: 3 },
  { date: '2024-12-23T00:00:00.000Z', pitchCount: 65, pitchesPerInning: 13, inningsPitched: 5, restDays: 3 },
  { date: '2024-12-26T00:00:00.000Z', pitchCount: 82, pitchesPerInning: 14, inningsPitched: 6, restDays: 3 },
  { date: '2024-12-29T00:00:00.000Z', pitchCount: 90, pitchesPerInning: 15, inningsPitched: 6, restDays: 3 }
]

// Create variations of base stats for each player
function getPlayerStats(playerId: number): PlayerGameStat[] {
  return baseStats.map((stat, index) => ({
    ...stat,
    pitchCount: Math.max(10, stat.pitchCount + (playerId * 3) - 30 + (index * 2)),
    pitchesPerInning: Math.max(5, stat.pitchesPerInning + Math.floor(playerId / 5) - 2),
    inningsPitched: Math.max(1, Math.min(7, stat.inningsPitched + Math.floor(playerId / 10) - 1)),
    restDays: Math.max(0, Math.min(5, stat.restDays + (playerId % 3) - 1))
  }))
}

const players: Player[] = [
  {
    id: 1,
    name: 'Alex Smith',
    avatar: { src: 'https://i.pravatar.cc/128?u=1' },
    status: 'green',
    teamId: 'gll',
    position: 'Pitcher',
    jerseyNumber: '21',
    birthDate: '2008-03-15',
    stats: getPlayerStats(1),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Jordan Brown',
    avatar: { src: 'https://i.pravatar.cc/128?u=2' },
    status: 'yellow',
    teamId: 'rcr',
    position: 'Catcher',
    jerseyNumber: '7',
    birthDate: '2009-07-22',
    stats: getPlayerStats(2),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 3,
    name: 'Taylor Green',
    avatar: { src: 'https://i.pravatar.cc/128?u=3' },
    status: 'red',
    teamId: 'cc',
    position: 'First Base',
    jerseyNumber: '44',
    birthDate: '2008-11-30',
    stats: getPlayerStats(3),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 4,
    name: 'Morgan White',
    avatar: { src: 'https://i.pravatar.cc/128?u=4' },
    status: 'yellow',
    teamId: 'mm',
    position: 'Shortstop',
    jerseyNumber: '12',
    birthDate: '2009-01-18',
    stats: getPlayerStats(4),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 5,
    name: 'Casey Gray',
    avatar: { src: 'https://i.pravatar.cc/128?u=5' },
    status: 'red',
    teamId: 'dd',
    position: 'Center Field',
    jerseyNumber: '8',
    birthDate: '2008-05-25',
    stats: getPlayerStats(5),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 6,
    name: 'Jamie Johnson',
    avatar: { src: 'https://i.pravatar.cc/128?u=6' },
    status: 'green',
    teamId: 'ccc',
    position: 'Pitcher',
    jerseyNumber: '31',
    birthDate: '2009-09-12',
    stats: getPlayerStats(6),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 7,
    name: 'Riley Davis',
    avatar: { src: 'https://i.pravatar.cc/128?u=7' },
    status: 'yellow',
    teamId: 'hh',
    position: 'Third Base',
    jerseyNumber: '5',
    birthDate: '2008-12-08',
    stats: getPlayerStats(7),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 8,
    name: 'Kelly Wilson',
    avatar: { src: 'https://i.pravatar.cc/128?u=8' },
    status: 'red',
    teamId: 'pp',
    position: 'Left Field',
    jerseyNumber: '23',
    birthDate: '2009-04-20',
    stats: getPlayerStats(8),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 9,
    name: 'Drew Moore',
    avatar: { src: 'https://i.pravatar.cc/128?u=9' },
    status: 'green',
    teamId: 'scs',
    position: 'Second Base',
    jerseyNumber: '16',
    birthDate: '2008-08-14',
    stats: getPlayerStats(9),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 10,
    name: 'Jordan Taylor',
    avatar: { src: 'https://i.pravatar.cc/128?u=10' },
    status: 'yellow',
    teamId: 'bab',
    position: 'Right Field',
    jerseyNumber: '19',
    birthDate: '2009-02-28',
    stats: getPlayerStats(10),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 11,
    name: 'Morgan Anderson',
    avatar: { src: 'https://i.pravatar.cc/128?u=11' },
    status: 'red',
    teamId: 'gll',
    position: 'Catcher',
    jerseyNumber: '2',
    birthDate: '2008-10-05',
    stats: getPlayerStats(11),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 12,
    name: 'Casey Thomas',
    avatar: { src: 'https://i.pravatar.cc/128?u=12' },
    status: 'green',
    teamId: 'rcr',
    position: 'Pitcher',
    jerseyNumber: '45',
    birthDate: '2009-06-17',
    stats: getPlayerStats(12),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 13,
    name: 'Jamie Jackson',
    avatar: { src: 'https://i.pravatar.cc/128?u=13' },
    status: 'yellow',
    teamId: 'cc',
    position: 'Shortstop',
    jerseyNumber: '11',
    birthDate: '2008-04-09',
    stats: getPlayerStats(13),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 14,
    name: 'Riley White',
    avatar: { src: 'https://i.pravatar.cc/128?u=14' },
    status: 'red',
    teamId: 'mm',
    position: 'Center Field',
    jerseyNumber: '27',
    birthDate: '2009-11-23',
    stats: getPlayerStats(14),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 15,
    name: 'Kelly Harris',
    avatar: { src: 'https://i.pravatar.cc/128?u=15' },
    status: 'green',
    teamId: 'dd',
    position: 'First Base',
    jerseyNumber: '33',
    birthDate: '2008-07-01',
    stats: getPlayerStats(15),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 16,
    name: 'Drew Martin',
    avatar: { src: 'https://i.pravatar.cc/128?u=16' },
    status: 'yellow',
    teamId: 'ccc',
    position: 'Third Base',
    jerseyNumber: '9',
    birthDate: '2009-03-29',
    stats: getPlayerStats(16),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 17,
    name: 'Alex Thompson',
    avatar: { src: 'https://i.pravatar.cc/128?u=17' },
    status: 'red',
    teamId: 'hh',
    position: 'Right Field',
    jerseyNumber: '24',
    birthDate: '2008-09-11',
    stats: getPlayerStats(17),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 18,
    name: 'Jordan Garcia',
    avatar: { src: 'https://i.pravatar.cc/128?u=18' },
    status: 'green',
    teamId: 'pp',
    position: 'Second Base',
    jerseyNumber: '4',
    birthDate: '2009-05-06',
    stats: getPlayerStats(18),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 19,
    name: 'Taylor Rodriguez',
    avatar: { src: 'https://i.pravatar.cc/128?u=19' },
    status: 'yellow',
    teamId: 'scs',
    position: 'Left Field',
    jerseyNumber: '17',
    birthDate: '2008-12-19',
    stats: getPlayerStats(19),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  },
  {
    id: 20,
    name: 'Morgan Lopez',
    avatar: { src: 'https://i.pravatar.cc/128?u=20' },
    status: 'red',
    teamId: 'bab',
    position: 'Pitcher',
    jerseyNumber: '38',
    birthDate: '2009-08-03',
    stats: getPlayerStats(20),
    lastUpdate: '2024-12-29T00:00:00.000Z'
  }
]

export default eventHandler(async (event) => {
  // Support filtering by team ID
  const query = getQuery(event)
  
  if (query.teamId) {
    return players.filter(player => player.teamId === query.teamId)
  }
  
  return players
})