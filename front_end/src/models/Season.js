import { Model, attr } from 'redux-orm'

export default class Season extends Model {
}

Season.modelName = 'Season'
Season.fields = {
  id: attr(),
  year: attr(),
}

