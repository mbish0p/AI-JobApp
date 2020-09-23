import { SAVE_JOB_CATEGORY } from './types'


export function saveJobCategory(jobCategory) {
    return {
        type: SAVE_JOB_CATEGORY,
        payload: jobCategory
    }
}