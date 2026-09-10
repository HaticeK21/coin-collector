local Coins = {}

function Coins.Add(currentCoins, amount)
    return currentCoins + amount
end

function Coins.Remove(currentCoins, amount)
    return math.max(0, currentCoins - amount)
end

return Coins
