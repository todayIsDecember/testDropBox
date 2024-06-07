export const getCoins = async () => {
  const response = await fetch("https://api-eu.okotoki.com/coins", {
    method: "GET",
  })
  const data = await response.json()
  return data
}