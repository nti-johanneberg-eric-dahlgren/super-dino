import { loadSario } from './sario'
import { Entity } from '../entity'
import { Dict } from '../../types'
import { loadOnion } from './onion'

export type EntityFactory = () => Entity

export type EntityFactoryDict = Dict<EntityFactory>

export async function loadEntities(): Promise<EntityFactoryDict> {
  const factories: EntityFactoryDict = {}

  const addAs = (name: string) => (factory: EntityFactory) => {
    factories[name] = factory
  }

  await Promise.all([
    loadSario().then(addAs('sario')),
    loadOnion().then(addAs('onion')),
  ])

  return factories
}