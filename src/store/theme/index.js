import * as func from '../function.js';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = func.theme_local.get() || {
    theme:'blue'
}

export default{
    state,
    actions,
    mutations,
    getters
}