/**
 * Calculates the current level of a user based on XP
 * @param xp 
 * @returns Current level
 */
const getLevelFromXP = (xp: number) => {
    return Math.floor((-5 + Math.sqrt(25+20 * xp)) / 10 + 1)
}

/**
 * Calculates total xp of a level
 * @param xp 
 * @returns XP from current level
 */
const getXPFromLevel = (level: number) => {
    return 10 * level
}

/**
 * Calculates how much XP is needed to reach the next level 
 * @param xp 
 * @returns XP until next level
 */
const nextLevel = (xp: number) => {
    const level = getLevelFromXP(xp)
    return 10 * ((level + 1) * ((level + 1) - 1 ) / 2 )
} // 10, 20, 30, etc.

/**
 * Calculates how much XP is needed for all previous levels 
 * @param xp 
 * @returns XP of previous level
 */
const prevLevels = (level: number) => {
    let total = 0
    for (let i = 0; i < level; i++) total += getXPFromLevel(i)
    return total
}

export {getLevelFromXP, getXPFromLevel, nextLevel, prevLevels}