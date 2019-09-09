import { SPORTS } from '../const'

export const selectSportsDropdown = (state) => ({
  title: "Sports",
  links: SPORTS.map((sport, index) => ({
    id: index,
    text: sport,
    data: sport,
  })),
})
