import { SAVE_ALL_OFFERS } from './types'

export function saveOffers(offers) {
    return {
        type: SAVE_ALL_OFFERS,
        payload: offers
    }
}