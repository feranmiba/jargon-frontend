import React from 'react'

function Notification() {


    const notificationPAyload = [
        {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },
        {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },      {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },      {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },      {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },      {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },      {
            content: "You have uploaded an new data",
            created_at: "2025-10-15"
        },
    ]



  return (
    <div className='max-w-5xl mx-auto'>

        <section>

            <div>
                <h1 className='text-3xl font-bold'>You have new Notifications</h1>
            </div>


            <section className='space-y-5 mt-5'>
                {notificationPAyload.map((notifies, index) => (

                    <div key={index} className='bg-white/80 shadow-xl p-4 rounded-2xl space-y-4'>
                        <p className='text-black/80'>{notifies.content}</p>
                        <p className='text-black/40'>{notifies.created_at}</p>
                    </div>

                ))}
            </section>




        </section>



    </div>
  )
}

export default Notification