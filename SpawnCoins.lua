local SpawnCoins = {}

function SpawnCoins.CreateCoin(position)
    return {
        position = position,
        value = 1
    }
end

return SpawnCoins
