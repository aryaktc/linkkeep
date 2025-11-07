import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SkeletonCard from '../components/SkeletonCard';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { authHeaders, fetchProfile } from '../lib/api';

function BookmarkForm({ onSaved, editing, initial }) {
  const [title,setTitle]=useState(initial?.title||'');
  const [url,setUrl]=useState(initial?.url||'');
  const [description,setDescription]=useState(initial?.description||'');
  const [tags,setTags]=useState((initial?.tags||[]).join(', '));
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  useEffect(()=> {
    setTitle(initial?.title||'');
    setUrl(initial?.url||'');
    setDescription(initial?.description||'');
    setTags((initial?.tags||[]).join(', '));
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !url) return setError('Title and URL are required.');
    setLoading(true);
    try {
      const body = { title, url, description, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) };
      const method = editing ? 'PUT' : 'POST';
      const urlPath = process.env.REACT_APP_API_URL + '/api/bookmarks' + (editing ? '/' + initial._id : '');
      const res = await fetch(urlPath, { method, headers: { 'Content-Type':'application/json', ...authHeaders() }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      toast.success(editing ? "Bookmark updated!" : "Bookmark added!");
      onSaved(data);
      if (!editing){ setTitle(''); setUrl(''); setDescription(''); setTags(''); }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow transition-colors">
      {error && <div className='text-red-600 mb-2'>{error}</div>}
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Title' className='w-full mb-2 p-2 border rounded'/>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder='https://example.com' className='w-full mb-2 p-2 border rounded'/>
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder='comma,separated,tags' className='w-full mb-2 p-2 border rounded'/>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder='Description' className='w-full mb-2 p-2 border rounded'/>
      <button disabled={loading} className="w-full py-2 bg-green-600 text-white rounded flex justify-center items-center gap-2">
        {loading && <Spinner size={16}/>}
        {editing ? "Save" : "Add"}
      </button>
    </form>
  );
}

export default function Bookmarks(){
  const [profile,setProfile]=useState(null);
  const [items,setItems]=useState([]);
  const [q,setQ]=useState('');
  const [tagFilter,setTagFilter]=useState('');
  const [editing,setEditing]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{ (async ()=> {
    try {
      const p = await fetchProfile();
      setProfile(p);
    } catch (err) { console.error(err); window.location.href = '/login'; }
  })(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (tagFilter) params.set('tag', tagFilter);
      const res = await fetch(process.env.REACT_APP_API_URL + '/api/bookmarks?' + params.toString(), { headers: { ...authHeaders() }});
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ if (profile) load(); }, [profile, q, tagFilter]);

  const onSaved = () => {
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete?')) return;
    await fetch(process.env.REACT_APP_API_URL + '/api/bookmarks/' + id, { method:'DELETE', headers: { ...authHeaders() }});
    toast.success("Bookmark deleted!");
    load();
  };

  const uniqueTags = Array.from(new Set(items.flatMap(i=>i.tags||[])));

  return (
    <Layout>
      {!profile ? <Spinner size={40}/> : (
        <>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>Dashboard</h2>
            <div className='text-sm text-gray-600 dark:text-gray-400'>Signed in as: {profile?.email}</div>
          </div>

          <BookmarkForm onSaved={onSaved} editing={!!editing} initial={editing}/>
          <div className='mb-4'>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search title or description' className='w-full p-2 border rounded'/>
          </div>

          <div className='mb-4'>
            <div className='flex gap-2 items-center flex-wrap'>
              <div>Filter by tag:</div>
              <button className={`px-2 py-1 border rounded ${tagFilter===''?'font-bold':''}`} onClick={()=>setTagFilter('')}>All</button>
              {uniqueTags.map(t=> <button key={t} onClick={()=>setTagFilter(t)} className={`px-2 py-1 border rounded ${tagFilter===t?'font-bold':''}`}>{t}</button>)}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-3">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">No bookmarks found.</div>
          ) : (
            <div className='grid gap-3'>
              {items.map((it,index)=>(
                <motion.div
                  key={it._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  className="p-3 bg-white dark:bg-gray-800 rounded shadow transition-colors"
                >
                  <div className='flex justify-between'>
                    <a href={it.url} target='_blank' rel='noreferrer' className='font-semibold text-blue-600 hover:underline'>{it.title}</a>
                    <div className='flex gap-2'>
                      <button onClick={()=>setEditing(it)} className='px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700'>Edit</button>
                      <button onClick={()=>remove(it._id)} className='px-2 py-1 border rounded hover:bg-red-100 text-red-500 dark:hover:bg-red-700'>Delete</button>
                    </div>
                  </div>
                  <div className='text-sm text-gray-700 dark:text-gray-300'>{it.description}</div>
                  <div className='mt-2 flex gap-2 flex-wrap'>
                    {(it.tags||[]).map(t=> <span key={t} className='text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-800'>{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
