
local Upgrade = {}

function Upgrade.Buy(currentLevel, currentCoins)
    local cost = currentLevel * 10

    if currentCoins >= cost then
        currentCoins = currentCoins - cost
        currentLevel = currentLevel + 1

        return currentLevel, currentCoins, true
    end

    return currentLevel, currentCoins, false
end

return Upgrade
