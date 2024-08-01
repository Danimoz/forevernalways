import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "@/lib/getPhotos";
import { Photo } from "@/types";
import HomeHeroUpload from "@/components/homeHeroUpload";
import { Suspense } from "react";

interface SearchParams {
  searchParams: {
    page: number;
  }
}
export default async function Home({ searchParams }: SearchParams) {
  const page = searchParams.page || 1;
  const pageSize = 10;
  const photos = await getPhotos(page, pageSize);

  return (
    <main className="min-h-screen">      
      <HomeHeroUpload />

      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">Photo Gallery</h2>

          <Suspense fallback={<div>Loading...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {photos.images.map((photo: Photo) => (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={photo._id}>
                  <Image
                    src={photo.url}
                    alt='Wedding Photo'
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-x-4 mt-6">
              <Link
                href={{ pathname: '/', query: { page: photos.page - 1 } }}
                className={`rounded-xl px-6 py-3 bg-[#ef2b7c] text-white ${photos.page <= 1 && 'pointer-events-none opacity-50' } `}
                scroll={false}
              >
                Previous
              </Link>
              <Link
                href={{ pathname: '/', query: { page: photos.page + 1 } }}
                className={`rounded-xl px-6 py-3 bg-[#ef2b7c] text-white ${photos.page >= photos.totalPages && 'pointer-events-none opacity-50' } `}
                scroll={false}
              >
                Next
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      <section id="gifts" className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">Gifts</h2>
          <p className="text-center mt-4 text-xl ">Dear Family and Friends,
            We are so excited to celebrate our special day with you! Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, 
          </p>
          <p className="text-center text-xl py-4">
            <span className="font-bold text-2xl">Bank Account Details</span><br />
            Bank: GTBank<br />
            Account Number: 0137100368
          </p>  
          <p className="text-center text-xl">
            <span className="font-bold text-2xl">Thank You</span><br />
            Thank you for your love, support, and generosity. We can&apos;t wait to celebrate with you!
            Love,
            Maris & Emmanuel
          </p>
        </div>            
      </section>
    </main>
  );
}
