import { ExternalLink } from 'lucide-react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export function Publications() {
  return (
    <section className="py-10 md:py-14 bg-secondary/5" id="publications">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-primary font-medium uppercase tracking-wider text-sm mb-2">
            Publications & Outreach
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
            UNT Libraries Publications
          </h2>
        </div>
        {/* Publications Carousel */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 shadow border border-primary/10 flex flex-col items-center mb-8">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3500}
            className="w-full max-w-md mb-4"
            dynamicHeight={false}
          >
            <div>
              <img
                src="/publications/Publications-download.png"
                alt="UNT Libraries Publication Download"
                className="rounded-lg"
              />
            </div>
            <div>
              <img
                src="/publications/Symposium photo.jpg"
                alt="Symposium Poster"
                className="rounded-lg"
              />
            </div>
            {/* Add more publication images here if needed */}
          </Carousel>
          <h3 className="font-semibold text-lg mb-2 text-center">Symposium Poster – UNT Libraries Digital Collections</h3>
          <p className="text-sm text-muted-foreground mb-3 text-center">
            My outreach work as an Assistant was published in the UNT Libraries digital collections. Click below to view the full publication and poster.
          </p>
          <a
            href="https://digital.library.unt.edu/ark:/67531/metadc2434846/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-4 py-2 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
          >
            <ExternalLink className="w-4 h-4" />
            View Publication
          </a>
        </div>

        {/* Outreach Work Carousel */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 shadow border border-primary/10 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-4 text-center">Outreach Activities & Impact</h3>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            className="w-full max-w-md mb-4"
            dynamicHeight={false}
          >
            <div>
              <img src="/Outreach/outreachmain.jpeg" alt="Main Outreach" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach1.jpeg" alt="Outreach 1" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach2.jpeg" alt="Outreach 2" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach3.jpeg" alt="Outreach 3" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach4.JPG" alt="Outreach 4" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach5.jpeg" alt="Outreach 5" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach6.jpeg" alt="Outreach 6" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach7.jpeg" alt="Outreach 7" className="rounded-lg" />
            </div>
            <div>
              <img src="/Outreach/outreach8.jpeg" alt="Outreach 8" className="rounded-lg" />
            </div>
          </Carousel>
          <video controls className="w-full max-w-md rounded-lg mb-3 border border-primary/20 shadow">
            <source src="/Outreach/outreachvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-muted-foreground text-center">
            Highlights from my outreach work at UNT Libraries, including workshops, mentorship, and community engagement.
          </p>
        </div>
      </div>
    </section>
  )
}