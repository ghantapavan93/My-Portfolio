import { useState } from 'react';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';

const contributionsData = {
  "Mentorship and Tutoring": [
    {
      title: "Workshop talk",
      type: "video",
      src: "/contributions/Mentorship and Tutoring/Workshop talk.mp4",
      description: "Technical workshops on Python, C++, Java, ML, and GenAI foundations."
    },
  ],
  "Research Papers": [
    {
      title: "SUDT Research Paper",
      type: "image",
      src: "/contributions/Research paper/SUDT.png",
      link: "https://www.ijfmr.com/research-paper.php?id=12384",
      description: "Published research paper on International Journal For MultiDisciplinary Research."
    },
  ],
  "UNT Library Publications": [
    {
      title: "UNT Library Symposium Photo",
      type: "image",
      src: "/contributions/UNT Library Publication/Symposium photo.png",
      link: "https://digital.library.unt.edu/ark:/67531/metadc2434846/",
      description: "Achievement at UNT Library."
    },
  ],
};

const workshopPhotos = [
  '/Workshops/outreach.jpeg',
  '/Workshops/outreach1.jpeg',
  '/Workshops/outreach2.jpeg',
  '/Workshops/outreach3.jpg',
  '/Workshops/outreach4.JPG',
  '/Workshops/outreach5.jpeg',
  '/Workshops/outreach6.jpeg',
  '/Workshops/outreach7.jpeg',
  '/Workshops/outreach8.jpeg',
  '/Workshops/outreachmain.jpeg',
];

const linkedInPosts = [
  {
    title: 'My Experience in AI, Software Development & Mentorship',
    type: "image",
    src: "/contributions/Linkedin/My exp in AI.jpg",
    link: 'https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_softwareengineering-ai-machinelearning-activity-7292416543970275328-8eUa',
  },
  {
    title: 'Create with Python',
    type: "image",
    src: "/contributions/Linkedin/Create with python.jpg",
    link: 'https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_python-softwareengineering-ai-activity-7298758761836331008-z51Q',
  },
  {
    title: 'JavaScript Innovation at UNT',
    type: "image",
    src: "/contributions/Linkedin/Javascript.jpg",
    link: 'https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_webdevelopment-javascript-frontenddevelopment-activity-7308894816111669248-60sD',
  },
  {
    title: 'Bridging Code, Creativity, and Real Impact — One Workshop at a Time',
    type: "image",
    src: "/contributions/Linkedin/Bridging.jpg",
    link: 'https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_opentowork-softwareengineering-machinelearning-activity-7318365589826072578-8mR5',
  },
  {
    title: 'Multidisciplinary Research in Action - Hackathon',
    type: "image",
    src: "/contributions/Linkedin/Hackathon.jpg",
    link: 'https://www.linkedin.com/posts/pavankalyan-ghanta-b20115200_gradinnohack2025-eagleeyeai-ai-activity-7315266190489047041-496I',
  },
];

export function ContributionsSection() {
  const [activeTab, setActiveTab] = useState(Object.keys(contributionsData)[0]);

  return (
    <section id="contributions" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary font-medium uppercase tracking-wider mb-2">Contributions</p>
          <h2 className="text-3xl font-semibold mb-4">My Work & Publications</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          {Object.keys(contributionsData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === category
                  ? 'bg-primary/10 text-primary font-semibold border border-primary/30 shadow-sm'
                  : 'bg-secondary/40 text-muted-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            key="Technical Programming Workshops"
            onClick={() => setActiveTab(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeTab === null
                ? 'bg-primary/10 text-primary font-semibold border border-primary/30 shadow-sm'
                : 'bg-secondary/40 text-muted-foreground hover:bg-secondary'
            }`}
          >
            Technical Programming Workshops
          </button>
        </div>

        {/* Content */}
        {activeTab !== null ? (
          <div className="flex justify-center">
            <div className="flex justify-center flex-wrap gap-6">
              {contributionsData[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-4 shadow border border-primary/10 flex flex-col items-center h-80 w-full max-w-[300px] justify-between"
                >
                  {/* Media (Video/Image) */}
                  {item.type === 'video' && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                      <video controls className="w-full h-full object-cover">
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  {item.type === 'image' && (
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="font-semibold text-lg mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{item.description}</p>

                  {/* View More Link */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 px-4 py-2 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Workshop Photos Grid */}
            <h3 className="text-xl font-semibold mb-6 text-center">Technical Programming Workshops</h3>
            <div className="flex justify-center mb-10">
              <div className="flex justify-center flex-wrap gap-6">
                {workshopPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden shadow border border-primary/10 w-full max-w-[300px] h-64 flex items-center justify-center"
                  >
                    <img
                      src={photo}
                      alt={`Workshop photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn Posts */}
            <h3 className="text-xl font-semibold mb-6 text-center">My Workshop LinkedIn Posts</h3>
            <div className="flex justify-center">
              <div className="flex justify-center flex-wrap gap-6">
                {linkedInPosts.map((post, idx) => (
                  <a
                    key={idx}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-primary/20 rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-105 h-[350px] w-full max-w-[300px] flex flex-col justify-between"
                  >
                    <img
                      src={post.src}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <h4 className="font-semibold text-lg text-center">{post.title}</h4>
                      <div className="mt-2 flex items-center justify-center text-primary">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        <span className="underline">View Post</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
