const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItems({ name, imageUrl, weather }) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  };
  return fetch(`${baseUrl}/items`, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItems(card) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${baseUrl}/items/${card._id}`, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, postItems, deleteItems };
