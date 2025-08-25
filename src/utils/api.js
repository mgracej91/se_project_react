export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.fin-tech.com"
    : "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems(jwt) {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function postItems({ name, imageUrl, weather }, jwt) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  };
  return fetch(`${baseUrl}/items`, options).then(checkResponse);
}

function addCardLike(id, jwt) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function removeCardLike(id, jwt) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}

function deleteItems(card, jwt) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  return fetch(`${baseUrl}/items/${card._id}`, options).then(checkResponse);
}

function updateUserProfile({ name, avatarUrl }, jwt) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, avatar: avatarUrl }),
  }).then(checkResponse);
}

export {
  checkResponse,
  getItems,
  postItems,
  addCardLike,
  removeCardLike,
  deleteItems,
  updateUserProfile,
};
