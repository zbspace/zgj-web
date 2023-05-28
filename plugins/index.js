import getBulidTimeFn from './plugin-getbulidtime'
export default function createVitePlugins(mode) {
    const vitePlugins = []
    vitePlugins.push(getBulidTimeFn())
    return vitePlugins
}