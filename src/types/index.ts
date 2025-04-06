export interface Team {
  id: number
  full_name: string
  abbreviation: string
  city: string
  conference: string
  division: string
}

export interface Player {
  id: number
  first_name: string
  last_name: string
  position: string
  height_feet: number | null
  height_inches: number | null
  weight_pounds: number | null
  team: Team
}

export interface PlayersResponse {
  data: Player[]
  meta: {
    total_pages: number
    current_page: number
    next_page: number | null
    per_page: number
    total_count: number
  }
}

export interface DetailsPlayers {
  data: {
    id: number,
    first_name: string,
    last_name: string,
    position: string,
    height: string,
    weight: string,
    jersey_number: string,
    college: string,
    country: string,
    draft_year: number,
    draft_round: number,
    draft_number: number,
    team: {
      id: number,
      conference: string,
      division: string,
      city: string,
      name: string,
      full_name: string,
      abbreviation: string
    }
  }
}