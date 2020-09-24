import {
    SAVE_JOB_CATEGORY,
    SAVE_EXPERIENCE_LVL,
    SAVE_POSITION_NAME
}
    from './types'


export function saveJobCategory(jobCategory) {
    return {
        type: SAVE_JOB_CATEGORY,
        payload: jobCategory
    }
}

export function saveExperienceLvl(lvl) {
    return {
        type: SAVE_EXPERIENCE_LVL,
        payload: lvl
    }
}

export function savePositionName(positionName) {
    return {
        type: SAVE_POSITION_NAME,
        payload: positionName
    }
}
