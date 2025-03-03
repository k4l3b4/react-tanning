<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/query')({
  component: Query,
})

function Query() {
  const { data, status } = useQuery<{ message: Array<string> }>({
    queryKey: ['fetchDogs'],
    queryFn: async () => {
      const res = await fetch(
        'https://dog.ceo/api/breed/terrier/american/images'
      )
      return await res.json()
    },
  })
  return (
    <div className='p-2'>
      <p>Watch out for Dogs...</p>
      {status === 'success' ? (
        <div className='grid grid-cols-4 gap-2'>
          {data.message.map((src: string) => {
            return (
              <div className='overflow-hidden h-64'>
                <img
                  src={src}
                  alt='dog'
                  className='w-full h-full object-cover'
                />
              </div>
            )
          })}
        </div>
      ) : (
        <p>Working...</p>
      )}
    </div>
  )
}
=======
import { DataFetcher } from '@k4l3b4/query-adapters'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/query')({
  component: Query,
})

function Query() {
  // const { data, status } = useQuery({
  //   queryKey: ['fetchDogs'],
  //   queryFn: async () => {
  //     const res = await fetch('https://dog.ceo/api/breeds/image/random')
  //     return await res.json()
  //   },
  // })
  return (
    <div className='p-2'>
      <DataFetcher
        queryKey={['fetchDogs']}
        url='https://dummyjson.com/products'
      >
        {({ data, error, isLoading, refetch }) => {
          console.log("data: ", data)
          console.log("error: ", error)
          console.log("isLoading: ", isLoading)
          return (
            isLoading ? (
              <p>Loading...</p>
            )
              : error ? (
                <>
                  <p>Error: {error.message}</p>
                  <button onClick={refetch} type="button">Refetch</button>
                </>
              )
                : (
                  data?.products?.map((product, index) => (
                    <div key={product?.title}>
                      <p>{product?.title}</p>
                      <img className="w-[300px] h-[200px] object-cover" src={product?.images[0]} alt='data?.title' />
                    </div>
                  )
                  )
                )
          )
        }}
      </DataFetcher>
      {/* {status === 'success' ? (
        <div className='overflow-hidden w-[640px] h-[480px]'>
          <img src={data.message} alt='dog' className='w-full' />
        </div>
      ) : (
        <p>Working...</p>
      )} */}
    </div>
  )
}
>>>>>>> 7c95042 (update)
