import * as actionTypes from '../constrains/store'

export function add(item) {
    return {
        type: actionTypes.STORE_ADD,
        data: item
    }
}

export function update(data) {
    return {
        type: actionTypes.STORE_UPDATE,
        data
    }
}

export function remove(item) {
    return {
        type: actionTypes.STORE_RM,
        data: item
    }
}