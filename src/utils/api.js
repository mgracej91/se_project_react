const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return checkResponse(res);
  });
}

function postItems({ name, imageUrl, weather }) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  };
  return fetch(`${baseUrl}/items`, options).then((res) => {
    return checkResponse(res);
  });
}

function deleteItems(card) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${baseUrl}/items/${card._id}`, options).then((res) => {
    return checkResponse(res);
  });
}

export { checkResponse, getItems, postItems, deleteItems };
