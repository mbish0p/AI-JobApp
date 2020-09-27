import {
    SAVE_JOB_CATEGORY,
    SAVE_EXPERIENCE_LVL,
    SAVE_POSITION_NAME,
    SAVE_REMOTE_WORK,
    SAVE_CITY_ADDRESS,
    SAVE_STREET_ADDRESS,
    SAVE_MIN_SALARY,
    SAVE_MAX_SALARY,
    SAVE_DESCRIPTION,
    SAVE_CONTRACT_TYPE,
    SAVE_RECRUITMENT_TYPE
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

export function saveCityAddress(city) {
    return {
        type: SAVE_CITY_ADDRESS,
        payload: city
    }
}

export function saveStreetAddress(street) {
    return {
        type: SAVE_STREET_ADDRESS,
        payload: street
    }
}

export function saveRemoteWork(remoteWork) {
    return {
        type: SAVE_REMOTE_WORK,
        payload: remoteWork
    }
}

export function saveContractType(contractType) {
    return {
        type: SAVE_CONTRACT_TYPE,
        payload: contractType
    }
}

export function saveMinSalary(minSalary) {
    return {
        type: SAVE_MIN_SALARY,
        payload: minSalary
    }
}

export function saveMaxSalary(maxSalary) {
    return {
        type: SAVE_MAX_SALARY,
        payload: maxSalary
    }
}

export function saveDescription(description) {
    return {
        type: SAVE_DESCRIPTION,
        payload: description
    }
}

export function saveRecruitmentType(recruitmentOnline) {
    return {
        type: SAVE_RECRUITMENT_TYPE,
        payload: recruitmentOnline
    }
}