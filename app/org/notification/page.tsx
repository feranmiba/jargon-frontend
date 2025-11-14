"use client"

import React from 'react'
import { useUser } from '@/app/utils/apis/dashboard'

function Notification() {
  const { orgNotification } = useUser();
  const { data, isLoading, isError } = orgNotification();

  const notificationPAyload = data ?? []; 

  if (isLoading) {
    return <p className='max-w-5xl mx-auto'>Loading Notifications...</p>;
  }

  if (isError) {
    return <p className='max-w-5xl mx-auto'>Failed to load notifications.</p>;
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <section>
        <h1 className='text-3xl font-bold'>You have new Notifications</h1>

        <section className='space-y-5 mt-5'>

          {notificationPAyload.length === 0 && (
            <div className='text-center text-gray-500 py-10'>
              <p>No notifications yet.</p>
            </div>
          )}

          {notificationPAyload.map((notifies: any, index: number) => (
            <div key={index} className='bg-white/80 shadow-xl p-4 rounded-2xl space-y-4'>
              <p className='text-black/80'>{notifies?.content ?? "No content"}</p>
              <p className='text-black/40'>{notifies?.created_at ?? ""}</p>
            </div>
          ))}

        </section>
      </section>
    </div>
  );
}

export default Notification;
