export function authHeaders(){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export async function fetchProfile(){
  const res = await fetch(process.env.REACT_APP_API_URL + '/api/profile', { headers: { ...authHeaders(), 'Content-Type':'application/json' }});
  if (!res.ok) throw new Error('Failed to fetch profile');
  return await res.json();
}
