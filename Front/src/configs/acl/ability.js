import { Ability } from '@casl/ability'
import { initialAbility } from './initialAbility'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userDataPim = JSON.parse(localStorage.getItem('userDataPim'))
const existingAbility = userDataPim ? userDataPim.ability : null

export default new Ability(existingAbility || initialAbility)
