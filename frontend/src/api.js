const API_URL = 'http://localhost:5000/api';

export async function getMyMessages() {
  const res = await fetch(`${API_URL}/messages/mine`);
  return res.json();
}

export async function submitMessage(data) {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getPendingApprovals() {
  const res = await fetch(`${API_URL}/messages/pending`);
  return res.json();
}

export async function approveMessage(id) {
  return fetch(`${API_URL}/messages/${id}/approve`, { method: 'POST' });
}

export async function rejectMessage(id) {
  return fetch(`${API_URL}/messages/${id}/reject`, { method: 'POST' });
}

export async function getMessageById(id) {
  const res = await fetch(`${API_URL}/messages/${id}`);
  return res.json();
}
